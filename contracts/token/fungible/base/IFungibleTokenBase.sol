// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC20 } from '../../../interfaces/IERC20.sol';
import { _IFungibleTokenBase } from './_IFungibleTokenBase.sol';

/**
 * @title FungibleToken base interface
 */
interface IFungibleTokenBase is _IFungibleTokenBase, IERC20 {}
