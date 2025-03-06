// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _Proxy } from '../../_Proxy.sol';
import { BeaconProxy } from '../BeaconProxy.sol';
import { _BeaconProxy } from '../_BeaconProxy.sol';
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
        override(_Proxy, _BeaconProxy, _DiamondBeaconProxy)
        returns (address implementation)
    {
        implementation = super._getImplementation();
    }
}
