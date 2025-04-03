// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IERC5267 } from '../interfaces/IERC5267.sol';
import { ITransientReentrancyGuard } from '../security/reentrancy_guard/ITransientReentrancyGuard.sol';
import { IContext } from './IContext.sol';
import { _IECDSAMetaTransactionContext } from './_IECDSAMetaTransactionContext.sol';

interface IECDSAMetaTransactionContext is
    _IECDSAMetaTransactionContext,
    IContext,
    ITransientReentrancyGuard,
    IERC5267
{}
