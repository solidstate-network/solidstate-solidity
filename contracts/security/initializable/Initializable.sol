// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IInitializable } from './IInitializable.sol';
import { _Initializable } from './_Initializable.sol';

abstract contract Initializable is IInitializable, _Initializable {}
