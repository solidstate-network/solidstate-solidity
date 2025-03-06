// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { DiamondBeacon } from './DiamondBeacon.sol';

contract DiamondBeaconMock is DiamondBeacon {
    constructor(address owner, FacetCut[] memory cuts) {
        _setOwner(owner);
        _diamondCut(cuts, address(0), '');
    }
}
