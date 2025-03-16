// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Introspectable } from '../../../introspection/Introspectable.sol';
import { INFTRoyalty } from './INFTRoyalty.sol';
import { ERC2981Storage } from '../../../storage/ERC2981Storage.sol';
import { _NFTRoyalty } from './_NFTRoyalty.sol';

/**
 * @title NFTRoyalty implementation
 */
abstract contract NFTRoyalty is INFTRoyalty, _NFTRoyalty, Introspectable {
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
