// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC20Base } from './base/_IERC20Base.sol';
import { _IERC20Extended } from './extended/_IERC20Extended.sol';
import { _IERC20Metadata } from './metadata/_IERC20Metadata.sol';
import { _IERC20Permit } from './permit/_IERC20Permit.sol';

interface _ISolidStateERC20 is
    _IERC20Base,
    _IERC20Extended,
    _IERC20Metadata,
    _IERC20Permit
{}
