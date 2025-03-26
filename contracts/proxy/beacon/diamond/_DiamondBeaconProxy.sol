// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _BeaconProxy } from '../_BeaconProxy.sol';
import { IDiamondBeacon } from './IDiamondBeacon.sol';
import { _IDiamondBeaconProxy } from './_IDiamondBeaconProxy.sol';

abstract contract _DiamondBeaconProxy is _IDiamondBeaconProxy, _BeaconProxy {
    function _getImplementation()
        internal
        view
        virtual
        override
        returns (address implementation)
    {
        implementation = _getImplementation(msg.sig);
    }

    function _getImplementation(
        bytes4 sig
    ) internal view virtual returns (address implementation) {
        implementation = IDiamondBeacon(_getBeacon()).facetAddress(sig);
    }
}
