// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC20 } from '../../interfaces/IERC20.sol';
import { _IFungibleToken } from './_IFungibleToken.sol';

/**
 * @title FungibleToken base interface
 */
interface IFungibleToken is _IFungibleToken, IERC20 {}
