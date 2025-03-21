// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC1967Storage } from '../../storage/ERC1967Storage.sol';
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
        implementation = IBeacon(_getBeacon()).implementation();
    }

    /**
     * @notice get beacon of proxy implementation
     * @return beacon beacon contract address
     */
    function _getBeacon() internal view virtual returns (address beacon) {
        beacon = ERC1967Storage
            .layout(ERC1967Storage.DEFAULT_STORAGE_SLOT)
            .beacon;
    }

    /**
     * @notice set beacon of proxy implementation
     * @param beacon beacon contract address
     */
    function _setBeacon(address beacon) internal virtual {
        ERC1967Storage
            .layout(ERC1967Storage.DEFAULT_STORAGE_SLOT)
            .beacon = beacon;

        emit BeaconUpgraded(beacon);
    }
}
