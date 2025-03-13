// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _INonFungibleTokenBase } from '../base/_INonFungibleTokenBase.sol';

/**
 * @title NonFungibleTokenMetadata internal interface
 */
interface _INonFungibleTokenMetadata is _INonFungibleTokenBase {
    error NonFungibleTokenMetadata__NonExistentToken();
}
