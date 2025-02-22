// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ProxyInternal } from '../ProxyInternal.sol';
import { IManagedProxyInternal } from './IManagedProxyInternal.sol';

abstract contract ManagedProxyInternal is IManagedProxyInternal, ProxyInternal {
    bytes4 internal immutable MANAGER_SELECTOR;

    /**
     * @inheritdoc ProxyInternal
     */
    function _getImplementation() internal view override returns (address) {
        (bool success, bytes memory data) = _getManager().staticcall(
            abi.encodePacked(MANAGER_SELECTOR)
        );
        if (!success) revert ManagedProxy__FetchImplementationFailed();
        return abi.decode(data, (address));
    }

    /**
     * @notice get manager of proxy implementation
     * @return manager address
     */
    function _getManager() internal view virtual returns (address);
}
