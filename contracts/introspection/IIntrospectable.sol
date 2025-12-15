// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { IERC165 } from '../interfaces/IERC165.sol';
import { _IIntrospectable } from './_IIntrospectable.sol';

interface IIntrospectable is _IIntrospectable, IERC165 {}
