// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _ERC20Metadata } from '../ERC20/metadata/_ERC20Metadata.sol';
import { _ERC20Permit } from '../ERC20/permit/_ERC20Permit.sol';
import { SolidstateERC20 } from '../ERC20/SolidstateERC20.sol';
import { ERC4626Base } from './base/ERC4626Base.sol';
import { ISolidstateERC4626 } from './ISolidstateERC4626.sol';
import { _SolidstateERC4626 } from './_SolidstateERC4626.sol';

/**
 * @title Solidstate ERC4626 implementation, including recommended ERC20 extensions
 */
abstract contract SolidstateERC4626 is
    ISolidstateERC4626,
    _SolidstateERC4626,
    ERC4626Base,
    SolidstateERC20
{}
