// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _ERC20Base } from './base/_ERC20Base.sol';
import { _ERC20Extended } from './extended/_ERC20Extended.sol';
import { _ERC20Metadata } from './metadata/_ERC20Metadata.sol';
import { _ERC20Permit } from './permit/_ERC20Permit.sol';
import { _ISolidStateERC20 } from './_ISolidStateERC20.sol';

/**
 * @title Solidstate ERC20 implementation, including recommended extensions
 */
abstract contract _SolidStateERC20 is
    _ISolidStateERC20,
    _ERC20Base,
    _ERC20Extended,
    _ERC20Metadata,
    _ERC20Permit
{}
