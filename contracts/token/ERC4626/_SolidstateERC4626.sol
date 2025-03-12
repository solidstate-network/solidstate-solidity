// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _ERC20Metadata } from '../ERC20/metadata/_ERC20Metadata.sol';
import { _SolidstateERC20 } from '../ERC20/_SolidstateERC20.sol';
import { _ERC4626Base } from './base/_ERC4626Base.sol';
import { _ISolidstateERC4626 } from './_ISolidstateERC4626.sol';

abstract contract _SolidstateERC4626 is
    _ISolidstateERC4626,
    _SolidstateERC20,
    _ERC4626Base
{}
