// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { IDiamondWritable } from '../writable/IDiamondWritable.sol';
import { DiamondBase, DiamondBaseStorage } from './DiamondBase.sol';

contract DiamondBaseMock is DiamondBase {
    using DiamondBaseStorage for DiamondBaseStorage.Layout;

    constructor(IDiamondWritable.FacetCut[] memory cuts) {
        DiamondBaseStorage.layout().diamondCut(cuts, address(0), '');
    }
}
