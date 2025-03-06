// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _ISolidStateERC20 } from '../ERC20/_ISolidStateERC20.sol';
import { _IERC4626Base } from './base/_IERC4626Base.sol';

interface _ISolidStateERC4626 is _ISolidStateERC20, _IERC4626Base {}
