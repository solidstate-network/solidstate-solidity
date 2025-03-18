// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC2771 } from '../interfaces/_IERC2771.sol';
import { _IContext } from './_IContext.sol';

interface _IForwardedMetaTransationContext is _IContext, _IERC2771 {}
