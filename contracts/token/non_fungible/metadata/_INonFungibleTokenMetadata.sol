// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { _IERC721Metadata } from '../../../interfaces/_IERC721Metadata.sol';
import { _INonFungibleToken } from '../_INonFungibleToken.sol';

/**
 * @title NonFungibleTokenMetadata internal interface
 */
interface _INonFungibleTokenMetadata is _INonFungibleToken, _IERC721Metadata {
    error NonFungibleTokenMetadata__NonExistentToken();
}
