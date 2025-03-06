// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC20 } from '../../../interfaces/_IERC20.sol';

/**
 * @title ERC20 base interface
 */
interface _IERC20Base is _IERC20 {
    error ERC20Base__ApproveFromZeroAddress();
    error ERC20Base__ApproveToZeroAddress();
    error ERC20Base__BurnExceedsBalance();
    error ERC20Base__BurnFromZeroAddress();
    error ERC20Base__InsufficientAllowance();
    error ERC20Base__MintToZeroAddress();
    error ERC20Base__TransferExceedsBalance();
    error ERC20Base__TransferFromZeroAddress();
    error ERC20Base__TransferToZeroAddress();
}
