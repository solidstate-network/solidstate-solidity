// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { Proxy } from '../Proxy.sol';
import { IBeaconProxy } from './IBeaconProxy.sol';

/**
 * @title Proxy with externally controlled implementation
 * @dev implementation fetched using immutable function selector
 */
abstract contract BeaconProxy is IBeaconProxy, Proxy {
    bytes4 internal immutable FETCH_IMPLEMENTATION_SELECTOR;

    /**
     * @param fetchImplementationSelector function selector used to fetch implementation from beacon
     */
    constructor(bytes4 fetchImplementationSelector) {
        FETCH_IMPLEMENTATION_SELECTOR = fetchImplementationSelector;
    }

    /**
     * @inheritdoc Proxy
     */
    function _getImplementation() internal view override returns (address) {
        (bool success, bytes memory data) = _getBeacon().staticcall(
            abi.encodePacked(FETCH_IMPLEMENTATION_SELECTOR)
        );
        if (!success) revert BeaconProxy__FetchImplementationFailed();
        return abi.decode(data, (address));
    }

    /**
     * @notice get beacon of proxy implementation
     * @return beacon address
     */
    function _getBeacon() internal view virtual returns (address);
}
