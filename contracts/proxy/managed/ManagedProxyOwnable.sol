// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { OwnableStorage } from '../../access/ownable/OwnableStorage.sol';
import { IManagedProxyOwnable } from './IManagedProxyOwnable.sol';
import { ManagedProxy } from './ManagedProxy.sol';

/**
 * @title Proxy with implementation controlled by ERC171 owner
 */
abstract contract ManagedProxyOwnable is IManagedProxyOwnable, ManagedProxy {
    /**
     * @inheritdoc ManagedProxy
     */
    function _getManager() internal view override returns (address) {
        return OwnableStorage.layout().owner;
    }
}
