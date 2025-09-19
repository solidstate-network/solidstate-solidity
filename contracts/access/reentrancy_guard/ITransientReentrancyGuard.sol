// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _ITransientReentrancyGuard } from './_ITransientReentrancyGuard.sol';
import { IReentrancyGuard } from './IReentrancyGuard.sol';

interface ITransientReentrancyGuard is
    _ITransientReentrancyGuard,
    IReentrancyGuard
{}
