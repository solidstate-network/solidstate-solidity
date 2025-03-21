// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC5267 } from '../interfaces/_IERC5267.sol';
import { _IContext } from './_IContext.sol';

interface _IECDSAMetaTransactionContext is _IContext, _IERC5267 {}
