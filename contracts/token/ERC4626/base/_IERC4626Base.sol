// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC4626 } from '../../../interfaces/_IERC4626.sol';
import { _IERC20Base } from '../../ERC20/base/_IERC20Base.sol';
import { _IERC20Metadata } from '../../ERC20/metadata/_IERC20Metadata.sol';

/**
 * @title ERC4626 base interface
 */
interface _IERC4626Base is _IERC20Base, _IERC20Metadata, _IERC4626 {
    error ERC4626Base__MaximumAmountExceeded();
    error ERC4626Base__AllowanceExceeded();
}
