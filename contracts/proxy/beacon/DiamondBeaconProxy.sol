// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ProxyInternal } from '../ProxyInternal.sol';
import { BeaconProxy } from './BeaconProxy.sol';
import { BeaconProxyInternal } from './BeaconProxyInternal.sol';
import { DiamondBeaconProxyInternal } from './DiamondBeaconProxyInternal.sol';
import { IDiamondBeaconProxy } from './IDiamondBeaconProxy.sol';

abstract contract DiamondBeaconProxy is
    IDiamondBeaconProxy,
    DiamondBeaconProxyInternal,
    BeaconProxy
{
    function _getImplementation()
        internal
        view
        override(ProxyInternal, BeaconProxyInternal, DiamondBeaconProxyInternal)
        returns (address implementation)
    {
        implementation = super._getImplementation();
    }
}
