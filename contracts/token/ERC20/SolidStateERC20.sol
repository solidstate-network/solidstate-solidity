// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC20Base } from './base/ERC20Base.sol';
import { ERC20Extended } from './extended/ERC20Extended.sol';
import { ERC20Metadata } from './metadata/ERC20Metadata.sol';
import { _ERC20Metadata } from './metadata/_ERC20Metadata.sol';
import { ERC20Permit } from './permit/ERC20Permit.sol';
import { _ERC20Permit } from './permit/_ERC20Permit.sol';
import { ISolidStateERC20 } from './ISolidStateERC20.sol';
import { _SolidStateERC20 } from './_SolidStateERC20.sol';

/**
 * @title Solidstate ERC20 implementation, including recommended extensions
 */
abstract contract SolidStateERC20 is
    ISolidStateERC20,
    _SolidStateERC20,
    ERC20Base,
    ERC20Extended,
    ERC20Metadata,
    ERC20Permit
{}
