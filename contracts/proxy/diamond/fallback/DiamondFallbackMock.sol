// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { OwnableStorage } from '../../../access/ownable/OwnableStorage.sol';
import { DiamondWritableInternal } from '../writable/DiamondWritableInternal.sol';
import { DiamondFallback } from './DiamondFallback.sol';

contract DiamondFallbackMock is DiamondFallback, DiamondWritableInternal {
    using OwnableStorage for OwnableStorage.Layout;

    constructor(FacetCut[] memory cuts) {
        OwnableStorage.layout().setOwner(msg.sender);
        _diamondCut(cuts, address(0), '');
    }
}
