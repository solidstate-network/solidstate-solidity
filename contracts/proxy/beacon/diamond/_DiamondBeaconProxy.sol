// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IDiamondBeacon } from '../../../beacon/diamond/IDiamondBeacon.sol';
import { _BeaconProxy } from '../_BeaconProxy.sol';
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
        implementation = IDiamondBeacon(_getBeacon()).implementation(sig);
    }
}
