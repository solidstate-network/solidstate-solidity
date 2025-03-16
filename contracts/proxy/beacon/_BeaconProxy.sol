// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ProxyStorage } from '../../storage/ProxyStorage.sol';
import { _Proxy } from '../_Proxy.sol';
import { IBeacon } from './IBeacon.sol';
import { _IBeaconProxy } from './_IBeaconProxy.sol';

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
     * @return beacon beacon contract address
     */
    function _getBeacon() internal view virtual returns (address beacon) {
        beacon = ProxyStorage.layout(ProxyStorage.DEFAULT_STORAGE_SLOT).beacon;
    }

    /**
     * @notice set beacon of proxy implementation
     * @param beacon beacon contract address
     */
    function _setBeacon(address beacon) internal virtual {
        ProxyStorage.layout(ProxyStorage.DEFAULT_STORAGE_SLOT).beacon = beacon;
    }
}
