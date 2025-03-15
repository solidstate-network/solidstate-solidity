// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IFungibleTokenBase } from '../base/_IFungibleTokenBase.sol';

/**
 * @title FungibleToken extended internal interface
 */
interface _IFungibleTokenExtended is _IFungibleTokenBase {
    error FungibleTokenExtended__ExcessiveAllowance();
    error FungibleTokenExtended__InsufficientAllowance();
}
