// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IReentrancyGuard } from './IReentrancyGuard.sol';
import { ReentrancyGuardInternal } from './ReentrancyGuardInternal.sol';

/**
 * @title Utility contract for preventing reentrancy attacks
 */
abstract contract ReentrancyGuard is
    IReentrancyGuard,
    ReentrancyGuardInternal
{}
