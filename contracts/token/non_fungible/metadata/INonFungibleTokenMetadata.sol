// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { IERC721Metadata } from '../../../interfaces/IERC721Metadata.sol';
import { _INonFungibleTokenMetadata } from './_INonFungibleTokenMetadata.sol';

/**
 * @title NonFungibleTokenMetadata interface
 */
interface INonFungibleTokenMetadata is
    _INonFungibleTokenMetadata,
    IERC721Metadata
{}
