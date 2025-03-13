// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _ISolidstateERC20 } from '../ERC20/_ISolidstateERC20.sol';
import { _IERC4626Base } from './base/_IERC4626Base.sol';

interface _ISolidstateERC4626 is _ISolidstateERC20, _IERC4626Base {}
