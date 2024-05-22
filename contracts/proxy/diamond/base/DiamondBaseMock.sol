// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { DiamondWritableInternal } from '../writable/DiamondWritableInternal.sol';
import { DiamondBase } from './DiamondBase.sol';

contract DiamondBaseMock is DiamondBase, DiamondWritableInternal {
    constructor(FacetCut[] memory cuts) {
        _diamondCut(cuts, address(0), '');
    }
}
