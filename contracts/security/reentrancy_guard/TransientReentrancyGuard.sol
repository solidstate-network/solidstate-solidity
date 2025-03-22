// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ITransientReentrancyGuard } from './ITransientReentrancyGuard.sol';
import { _TransientReentrancyGuard } from './_TransientReentrancyGuard.sol';

abstract contract TransientReentrancyGuard is
    ITransientReentrancyGuard,
    _TransientReentrancyGuard
{}
