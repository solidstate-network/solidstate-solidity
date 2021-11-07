// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { Proxy } from '../Proxy.sol';

/**
 * @title Proxy with externally controlled implementation
 * @dev implementation fetched using immutable function selector
 */
abstract contract ManagedProxy is Proxy {
    bytes4 internal immutable MANAGER_SELECTOR;

    /**
     * @param managerSelector function selector used to fetch implementation from manager
     */
    constructor(bytes4 managerSelector) {
        MANAGER_SELECTOR = managerSelector;
    }

    /**
     * @inheritdoc Proxy
     */
    function _getImplementation() internal view override returns (address) {
        (bool success, bytes memory data) = _getManager().staticcall(
            abi.encodePacked(MANAGER_SELECTOR)
        );
        require(success, 'ManagedProxy: failed to fetch implementation');
        return abi.decode(data, (address));
    }

    /**
     * @notice get manager of proxy implementation
     * @return manager address
     */
    function _getManager() internal view virtual returns (address);
}
