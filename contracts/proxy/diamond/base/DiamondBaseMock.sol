// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _DiamondWritable } from '../writable/_DiamondWritable.sol';
import { DiamondBase } from './DiamondBase.sol';

contract DiamondBaseMock is DiamondBase, _DiamondWritable {
    constructor(FacetCut[] memory cuts) {
        _diamondCut(cuts, address(0), '');
    }
}
