// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC2612 } from '../../../interfaces/_IERC2612.sol';
import { _IERC20Base } from '../base/_IERC20Base.sol';
import { _IERC20Metadata } from '../metadata/_IERC20Metadata.sol';

interface _IERC20Permit is _IERC20Base, _IERC20Metadata, _IERC2612 {
    error ERC20Permit__ExpiredDeadline();
    error ERC20Permit__InvalidSignature();
}
