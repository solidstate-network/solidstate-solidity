// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { _Context } from './_Context.sol';
import { IContext } from './IContext.sol';

abstract contract Context is IContext, _Context {}
