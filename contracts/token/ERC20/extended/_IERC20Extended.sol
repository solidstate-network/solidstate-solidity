// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC20Base } from '../base/_IERC20Base.sol';

/**
 * @title ERC20 extended internal interface
 */
interface _IERC20Extended is _IERC20Base {
    error ERC20Extended__ExcessiveAllowance();
    error ERC20Extended__InsufficientAllowance();
}
