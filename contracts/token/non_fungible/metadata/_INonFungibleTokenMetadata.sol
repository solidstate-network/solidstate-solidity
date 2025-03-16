// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _INonFungibleToken } from '..//_INonFungibleToken.sol';

/**
 * @title NonFungibleTokenMetadata internal interface
 */
interface _INonFungibleTokenMetadata is _INonFungibleToken {
    error NonFungibleTokenMetadata__NonExistentToken();
}
