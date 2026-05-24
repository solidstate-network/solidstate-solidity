// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IERC5267 } from '../interfaces/_IERC5267.sol';
import { _ITransientReentrancyGuard } from '../access/reentrancy_guard/_ITransientReentrancyGuard.sol';
import { _IContext } from './_IContext.sol';

interface _IECDSAMetaTransactionContext is
    _IContext,
    _ITransientReentrancyGuard,
    _IERC5267
{}
