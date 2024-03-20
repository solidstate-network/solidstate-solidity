// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ISolidStateERC20 } from '../ERC20/ISolidStateERC20.sol';
import { IERC4626Base } from './base/IERC4626Base.sol';

interface ISolidStateERC4626 is IERC4626Base, ISolidStateERC20 {}
