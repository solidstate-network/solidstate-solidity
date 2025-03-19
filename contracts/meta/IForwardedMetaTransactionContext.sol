// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC2771 } from '../interfaces/IERC2771.sol';
import { IContext } from './IContext.sol';
import { _IForwardedMetaTransactionContext } from './_IForwardedMetaTransactionContext.sol';

interface IForwardedMetaTransactionContext is
    _IForwardedMetaTransactionContext,
    IContext,
    IERC2771
{}
