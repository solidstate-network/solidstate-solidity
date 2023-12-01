// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { BeaconProxy } from './BeaconProxy.sol';
import { IDiamondBeacon } from './IDiamondBeacon.sol';

abstract contract DiamondBeaconProxy is BeaconProxy {
    function _getImplementation() internal view override returns (address) {
        return IDiamondBeacon(_getBeacon()).facetAddress(msg.sig);
    }
}
