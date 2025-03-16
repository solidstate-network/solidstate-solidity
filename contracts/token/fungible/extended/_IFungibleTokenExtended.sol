// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IFungibleToken } from '../_IFungibleToken.sol';

/**
 * @title FungibleToken extended internal interface
 */
interface _IFungibleTokenExtended is _IFungibleToken {
    error FungibleTokenExtended__ExcessiveAllowance();
    error FungibleTokenExtended__InsufficientAllowance();
}
