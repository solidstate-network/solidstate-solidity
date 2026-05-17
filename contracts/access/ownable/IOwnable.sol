// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { IERC173 } from '../../interfaces/IERC173.sol';
import { IContext } from '../../meta/IContext.sol';
import { _IOwnable } from './_IOwnable.sol';

interface IOwnable is _IOwnable, IContext, IERC173 {}
