// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _ERC721Metadata } from './_ERC721Metadata.sol';
import { IERC721Metadata } from './IERC721Metadata.sol';

/**
 * @title ERC721 metadata extensions
 */
abstract contract ERC721Metadata is IERC721Metadata, _ERC721Metadata {
    /**
     * @notice inheritdoc IERC721Metadata
     */
    function name() external view returns (string memory) {
        return _name();
    }

    /**
     * @notice inheritdoc IERC721Metadata
     */
    function symbol() external view returns (string memory) {
        return _symbol();
    }

    /**
     * @notice inheritdoc IERC721Metadata
     */
    function tokenURI(uint256 tokenId) external view returns (string memory) {
        return _tokenURI(tokenId);
    }
}
