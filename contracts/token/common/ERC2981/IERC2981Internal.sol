// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { IERC2981 } from '../../../interfaces/IERC2981.sol';

/**
 * @title ERC2981 interface
 */
interface IERC2981Internal {
    error ERC2981Internal__RoyaltyExceedsMax();
    error ERC2981Internal__RoyaltyNotSet();
}
