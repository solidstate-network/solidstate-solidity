// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC173 } from '../../interfaces/IERC173.sol';
import { _IOwnable } from './_IOwnable.sol';

interface IOwnable is _IOwnable, IERC173 {}
