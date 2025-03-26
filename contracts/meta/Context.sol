// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IContext } from './IContext.sol';
import { _Context } from './_Context.sol';

abstract contract Context is IContext, _Context {}
