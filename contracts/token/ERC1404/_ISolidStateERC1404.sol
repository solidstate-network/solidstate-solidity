// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _ISolidStateERC20 } from '../ERC20/_ISolidStateERC20.sol';
import { _IERC1404Base } from '../ERC1404/base/_IERC1404Base.sol';

interface _ISolidStateERC1404 is _ISolidStateERC20, _IERC1404Base {}
