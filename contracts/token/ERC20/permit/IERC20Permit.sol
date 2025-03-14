// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC2612 } from '../../../interfaces/IERC2612.sol';
import { IERC5267 } from '../../../interfaces/IERC5267.sol';
import { _IERC20Permit } from './_IERC20Permit.sol';

interface IERC20Permit is _IERC20Permit, IERC2612, IERC5267 {}
