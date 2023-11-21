// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import { IInitializable } from './IInitializable.sol';
import { InitializableInternal } from './InitializableInternal.sol';

abstract contract Initializable is IInitializable, InitializableInternal {}
