// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IReentrancyGuard } from './IReentrancyGuard.sol';
import { _ReentrancyGuard } from './_ReentrancyGuard.sol';

/**
 * @title Utility contract for preventing reentrancy attacks
 */
abstract contract ReentrancyGuard is IReentrancyGuard, _ReentrancyGuard {}
