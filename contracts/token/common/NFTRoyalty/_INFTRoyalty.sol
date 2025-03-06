// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC2981 } from '../../../interfaces/_IERC2981.sol';

interface _INFTRoyalty is _IERC2981 {
    error NFTRoyalty__RoyaltyTooHigh();
}
