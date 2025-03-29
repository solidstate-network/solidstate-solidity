// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IERC2771 } from '../interfaces/_IERC2771.sol';
import { _IContext } from './_IContext.sol';

interface _IForwardedMetaTransactionContext is _IContext, _IERC2771 {}
