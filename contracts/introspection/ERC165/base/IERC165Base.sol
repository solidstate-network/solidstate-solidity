// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC165 } from '../../../interfaces/IERC165.sol';
import { _IERC165Base } from './_IERC165Base.sol';

interface IERC165Base is _IERC165Base, IERC165 {}
