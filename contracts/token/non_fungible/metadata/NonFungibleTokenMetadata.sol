// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

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
     * @notice inheritdoc INonFungibleTokenMetadata
     */
    function name() external view returns (string memory) {
        return _name();
    }

    /**
     * @notice inheritdoc INonFungibleTokenMetadata
     */
    function symbol() external view returns (string memory) {
        return _symbol();
    }

    /**
     * @notice inheritdoc INonFungibleTokenMetadata
     */
    function tokenURI(uint256 tokenId) external view returns (string memory) {
        return _tokenURI(tokenId);
    }
}
