// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC721Metadata } from '../../../interfaces/IERC721Metadata.sol';
import { _NonFungibleTokenMetadata } from './_NonFungibleTokenMetadata.sol';
import { INonFungibleTokenMetadata } from './INonFungibleTokenMetadata.sol';

/**
 * @title NonFungibleToken metadata extensions
 */
abstract contract NonFungibleTokenMetadata is
    INonFungibleTokenMetadata,
    _NonFungibleTokenMetadata
{
    /**
     * @inheritdoc IERC721Metadata
     */
    function name() external view returns (string memory) {
        return _name();
    }

    /**
     * @inheritdoc IERC721Metadata
     */
    function symbol() external view returns (string memory) {
        return _symbol();
    }

    /**
     * @inheritdoc IERC721Metadata
     */
    function tokenURI(uint256 tokenId) external view returns (string memory) {
        return _tokenURI(tokenId);
    }
}
