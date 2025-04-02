// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IReentrancyGuard } from './IReentrancyGuard.sol';
import { _ITransientReentrancyGuard } from './_ITransientReentrancyGuard.sol';

interface ITransientReentrancyGuard is
    _ITransientReentrancyGuard,
    IReentrancyGuard
{}
