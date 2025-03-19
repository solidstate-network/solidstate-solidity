// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1155Metadata } from '../../../interfaces/IERC1155Metadata.sol';
import { IMultiTokenMetadata } from './IMultiTokenMetadata.sol';
import { _MultiTokenMetadata } from './_MultiTokenMetadata.sol';

/**
 * @title MultiToken metadata extensions
 */
abstract contract MultiTokenMetadata is
    IMultiTokenMetadata,
    _MultiTokenMetadata
{
    /**
     * @inheritdoc IERC1155Metadata
     */
    function uri(uint256 tokenId) external view returns (string memory) {
        return _uri(tokenId);
    }
}
