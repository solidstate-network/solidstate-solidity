// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { _ReentrancyGuard } from './_ReentrancyGuard.sol';
import { IReentrancyGuard } from './IReentrancyGuard.sol';

/**
 * @title Utility contract for preventing reentrancy attacks
 */
abstract contract ReentrancyGuard is IReentrancyGuard, _ReentrancyGuard {}
