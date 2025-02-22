// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { DiamondWritableInternal } from '../writable/DiamondWritableInternal.sol';
import { DiamondFallback } from './DiamondFallback.sol';

contract DiamondFallbackMock is DiamondFallback, DiamondWritableInternal {
    constructor(FacetCut[] memory cuts) {
        _setOwner(msg.sender);
        _diamondCut(cuts, address(0), '');
    }

    /**
     * @dev suppress compiler warning
     */
    receive() external payable {}
}
