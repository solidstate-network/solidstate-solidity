// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _Proxy } from '../_Proxy.sol';
import { IBeacon } from './IBeacon.sol';
import { _IBeaconProxy } from './_IBeaconProxy.sol';
import { BeaconProxyStorage } from './BeaconProxyStorage.sol';

abstract contract _BeaconProxy is _IBeaconProxy, _Proxy {
    /**
     * @inheritdoc _Proxy
     */
    function _getImplementation()
        internal
        view
        virtual
        override
        returns (address implementation)
    {
        implementation = IBeacon(_getBeacon()).getImplementation();
    }

    /**
     * @notice get beacon of proxy implementation
     * @return beacon address
     */
    function _getBeacon() internal view virtual returns (address beacon) {
        beacon = BeaconProxyStorage.layout().beacon;
    }
}
