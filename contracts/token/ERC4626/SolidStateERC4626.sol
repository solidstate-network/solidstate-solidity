// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _ERC20Metadata } from '../ERC20/metadata/_ERC20Metadata.sol';
import { _ERC20Permit } from '../ERC20/permit/_ERC20Permit.sol';
import { SolidStateERC20 } from '../ERC20/SolidStateERC20.sol';
import { ERC4626Base } from './base/ERC4626Base.sol';
import { ISolidStateERC4626 } from './ISolidStateERC4626.sol';
import { _SolidStateERC4626 } from './_SolidStateERC4626.sol';

/**
 * @title Solidstate ERC4626 implementation, including recommended ERC20 extensions
 */
abstract contract SolidStateERC4626 is
    ISolidStateERC4626,
    _SolidStateERC4626,
    ERC4626Base,
    SolidStateERC20
{}
