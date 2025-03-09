// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1271 } from '../../interfaces/IERC1271.sol';
import { _IERC1271Base } from './_IERC1271Base.sol';

interface IERC1271Base is _IERC1271Base, IERC1271 {}
