// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IERC20 } from '../../interfaces/IERC20.sol';
import { IContext } from '../../meta/IContext.sol';
import { _IFungibleToken } from './_IFungibleToken.sol';

/**
 * @title FungibleToken base interface
 */
interface IFungibleToken is _IFungibleToken, IERC20, IContext {}
