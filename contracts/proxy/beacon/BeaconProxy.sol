// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _Proxy } from '../_Proxy.sol';
import { Proxy } from '../Proxy.sol';
import { _BeaconProxy } from './_BeaconProxy.sol';
import { IBeaconProxy } from './IBeaconProxy.sol';

/**
 * @title Proxy with externally controlled implementation
 * @dev implementation fetched using immutable function selector
 */
abstract contract BeaconProxy is IBeaconProxy, _BeaconProxy, Proxy {
    function _getImplementation()
        internal
        view
        virtual
        override(_Proxy, _BeaconProxy)
        returns (address implementation)
    {
        implementation = super._getImplementation();
    }
}
