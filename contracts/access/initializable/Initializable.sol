// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _Initializable } from './_Initializable.sol';
import { IInitializable } from './IInitializable.sol';

abstract contract Initializable is IInitializable, _Initializable {}
