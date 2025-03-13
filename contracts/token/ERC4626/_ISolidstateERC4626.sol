// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _ISolidstateFungibleToken } from '../fungible/_ISolidstateFungibleToken.sol';
import { _IERC4626Base } from './base/_IERC4626Base.sol';

interface _ISolidstateERC4626 is _ISolidstateFungibleToken, _IERC4626Base {}
