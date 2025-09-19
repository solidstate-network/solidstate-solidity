// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { BeaconProxy } from '../BeaconProxy.sol';
import { _DiamondBeaconProxy } from './_DiamondBeaconProxy.sol';
import { IDiamondBeaconProxy } from './IDiamondBeaconProxy.sol';

abstract contract DiamondBeaconProxy is
    IDiamondBeaconProxy,
    _DiamondBeaconProxy,
    BeaconProxy
{
    function _getImplementation()
        internal
        view
        override(BeaconProxy, _DiamondBeaconProxy)
        returns (address implementation)
    {
        implementation = super._getImplementation();
    }
}
