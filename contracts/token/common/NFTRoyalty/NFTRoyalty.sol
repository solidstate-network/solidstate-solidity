// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { INFTRoyalty } from './INFTRoyalty.sol';
import { NFTRoyaltyStorage } from './NFTRoyaltyStorage.sol';
import { NFTRoyaltyInternal } from './NFTRoyaltyInternal.sol';

/**
 * @title NFTRoyalty implementation
 */
abstract contract NFTRoyalty is INFTRoyalty, NFTRoyaltyInternal {
    /**
     * @notice inheritdoc INFTRoyalty
     */
    function royaltyInfo(
        uint256 tokenId,
        uint256 salePrice
    ) external view returns (address, uint256) {
        return _royaltyInfo(tokenId, salePrice);
    }
}
