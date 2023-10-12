// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { OwnableInternal } from '../../access/ownable/OwnableInternal.sol';
import { IBeaconProxyOwnable } from './IBeaconProxyOwnable.sol';
import { BeaconProxy } from './BeaconProxy.sol';

/**
 * @title Proxy with implementation controlled by ERC171 owner
 */
abstract contract BeaconProxyOwnable is
    IBeaconProxyOwnable,
    BeaconProxy,
    OwnableInternal
{
    /**
     * @inheritdoc BeaconProxy
     */
    function _getBeacon() internal view override returns (address) {
        return _owner();
    }
}
