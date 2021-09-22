// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { OwnableStorage } from '../../access/OwnableStorage.sol';
import { ManagedProxy } from './ManagedProxy.sol';

/**
 * @title Proxy with implementation controlled by ERC171 owner
 */
abstract contract ManagedProxyOwnable is ManagedProxy {
    /**
     * @inheritdoc ManagedProxy
     */
    function _getManager() internal view override returns (address) {
        return OwnableStorage.layout().owner;
    }
}
