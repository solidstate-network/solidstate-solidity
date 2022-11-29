// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { DiamondWritableInternal } from '../writable/DiamondWritableInternal.sol';
import { DiamondFallback } from './DiamondFallback.sol';

contract DiamondFallbackMock is DiamondFallback, DiamondWritableInternal {
    constructor(FacetCut[] memory cuts) {
        _diamondCut(cuts, address(0), '');
    }

    function getFallbackAddress()
        external
        view
        returns (address fallbackAddress)
    {
        fallbackAddress = _getFallbackAddress();
    }

    function setFallbackAddress(address fallbackAddress) external {
        _setFallbackAddress(fallbackAddress);
    }
}
