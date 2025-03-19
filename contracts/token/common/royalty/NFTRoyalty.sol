// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC2981 } from '../../../interfaces/IERC2981.sol';
import { Introspectable } from '../../../introspection/Introspectable.sol';
import { INFTRoyalty } from './INFTRoyalty.sol';
import { _NFTRoyalty } from './_NFTRoyalty.sol';

/**
 * @title NFTRoyalty implementation
 */
abstract contract NFTRoyalty is INFTRoyalty, _NFTRoyalty, Introspectable {
    /**
     * @inheritdoc IERC2981
     */
    function royaltyInfo(
        uint256 tokenId,
        uint256 salePrice
    ) external view returns (address receiver, uint256 royaltyAmount) {
        return _royaltyInfo(tokenId, salePrice);
    }
}
