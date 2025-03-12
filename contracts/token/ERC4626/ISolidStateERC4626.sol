// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ISolidStateERC20 } from '../ERC20/ISolidStateERC20.sol';
import { IERC4626Base } from './base/IERC4626Base.sol';
import { _ISolidStateERC4626 } from './_ISolidStateERC4626.sol';

interface ISolidStateERC4626 is
    _ISolidStateERC4626,
    ISolidStateERC20,
    IERC4626Base
{}
