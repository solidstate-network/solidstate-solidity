// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC165Base } from '../../../introspection/ERC165/base/ERC165Base.sol';
import { INFTRoyalty } from './INFTRoyalty.sol';
import { NFTRoyaltyStorage } from './NFTRoyaltyStorage.sol';
import { _NFTRoyalty } from './_NFTRoyalty.sol';

/**
 * @title NFTRoyalty implementation
 */
abstract contract NFTRoyalty is INFTRoyalty, _NFTRoyalty, ERC165Base {
    /**
     * @notice inheritdoc INFTRoyalty
     */
    function royaltyInfo(
        uint256 tokenId,
        uint256 salePrice
    ) external view returns (address receiver, uint256 royaltyAmount) {
        return _royaltyInfo(tokenId, salePrice);
    }
}
