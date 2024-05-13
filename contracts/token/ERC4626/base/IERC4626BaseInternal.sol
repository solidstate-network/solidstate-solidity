// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC4626Internal } from '../../../interfaces/IERC4626Internal.sol';

/**
 * @title ERC4626 base interface
 */
interface IERC4626BaseInternal is IERC4626Internal {
    error ERC4626Base__MaximumAmountExceeded();
    error ERC4626Base__AllowanceExceeded();
}
