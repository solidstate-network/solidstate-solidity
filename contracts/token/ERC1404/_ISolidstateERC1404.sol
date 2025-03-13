// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _ISolidstateERC20 } from '../ERC20/_ISolidstateERC20.sol';
import { _IERC1404Base } from '../ERC1404/base/_IERC1404Base.sol';

interface _ISolidstateERC1404 is _ISolidstateERC20, _IERC1404Base {}
