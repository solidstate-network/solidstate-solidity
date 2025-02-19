// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { OwnableInternal } from '../../access/ownable/OwnableInternal.sol';
import { IManagedProxyOwnable } from './IManagedProxyOwnable.sol';
import { ManagedProxy } from './ManagedProxy.sol';

/**
 * @title Proxy with implementation controlled by ERC171 owner
 */
abstract contract ManagedProxyOwnable is
    IManagedProxyOwnable,
    ManagedProxy,
    OwnableInternal
{
    /**
     * @inheritdoc ManagedProxy
     */
    function _getManager() internal view override returns (address) {
        return _owner();
    }
}
