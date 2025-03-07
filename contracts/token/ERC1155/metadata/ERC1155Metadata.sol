// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1155Metadata } from './IERC1155Metadata.sol';
import { _ERC1155Metadata } from './_ERC1155Metadata.sol';

/**
 * @title ERC1155 metadata extensions
 */
abstract contract ERC1155Metadata is IERC1155Metadata, _ERC1155Metadata {
    /**
     * @notice inheritdoc IERC1155Metadata
     */
    function uri(uint256 tokenId) external view returns (string memory) {
        return _uri(tokenId);
    }
}
