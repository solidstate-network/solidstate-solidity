// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _ISolidstateFungibleToken } from '../fungible/_ISolidstateFungibleToken.sol';
import { _IERC1404Base } from '../ERC1404/base/_IERC1404Base.sol';

interface _ISolidstateERC1404 is _ISolidstateFungibleToken, _IERC1404Base {}
