// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC2612 } from '../../../interfaces/IERC2612.sol';
import { IERC5267 } from '../../../interfaces/IERC5267.sol';
import { IERC20Metadata } from '../metadata/IERC20Metadata.sol';
import { _IERC20Permit } from './_IERC20Permit.sol';

// TODO: note that IERC20Metadata is needed for eth-permit library

interface IERC20Permit is _IERC20Permit, IERC2612, IERC5267 {}
