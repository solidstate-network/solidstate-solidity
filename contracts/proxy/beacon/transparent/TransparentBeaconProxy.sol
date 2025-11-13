// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _Proxy } from '../../_Proxy.sol';
import { _BeaconProxy } from '../_BeaconProxy.sol';
import { BeaconProxy } from '../BeaconProxy.sol';
import { _TransparentBeaconProxy } from './_TransparentBeaconProxy.sol';
import { ITransparentBeaconProxy } from './ITransparentBeaconProxy.sol';

abstract contract TransparentBeaconProxy is
    ITransparentBeaconProxy,
    _TransparentBeaconProxy,
    BeaconProxy
{
    function _getImplementation()
        internal
        view
        virtual
        override(_BeaconProxy, BeaconProxy)
        returns (address implementation)
    {
        implementation = super._getImplementation();
    }

    function _fallback()
        internal
        virtual
        override(_Proxy, _TransparentBeaconProxy)
    {
        super._fallback();
    }
}
