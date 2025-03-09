// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC20 } from '../../../interfaces/IERC20.sol';
import { _IERC20Base } from './_IERC20Base.sol';

/**
 * @title ERC20 base interface
 */
interface IERC20Base is _IERC20Base, IERC20 {}
