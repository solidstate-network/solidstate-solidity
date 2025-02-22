// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { OwnableInternal } from '../../access/ownable/OwnableInternal.sol';
import { IManagedProxyOwnableInternal } from './IManagedProxyOwnableInternal.sol';
import { ManagedProxyInternal } from './ManagedProxyInternal.sol';

abstract contract ManagedProxyOwnableInternal is
    IManagedProxyOwnableInternal,
    ManagedProxyInternal,
    OwnableInternal
{
    /**
     * @inheritdoc ManagedProxyInternal
     */
    function _getManager() internal view override returns (address) {
        return _owner();
    }
}
