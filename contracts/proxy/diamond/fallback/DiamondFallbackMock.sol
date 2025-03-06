// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _DiamondWritable } from '../writable/_DiamondWritable.sol';
import { DiamondFallback } from './DiamondFallback.sol';

contract DiamondFallbackMock is DiamondFallback, _DiamondWritable {
    constructor(FacetCut[] memory cuts) {
        _setOwner(msg.sender);
        _diamondCut(cuts, address(0), '');
    }

    /**
     * @dev suppress compiler warning
     */
    receive() external payable {}
}
