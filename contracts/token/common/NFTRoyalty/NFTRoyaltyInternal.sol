// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { INFTRoyaltyInternal } from './INFTRoyaltyInternal.sol';
import { NFTRoyaltyStorage } from './NFTRoyaltyStorage.sol';

/**
 * @title NFTRoyalty internal functions
 */
abstract contract NFTRoyaltyInternal is INFTRoyaltyInternal {
    uint16 private constant MAX_ROYALTY = 10000;

    /**
     * @notice calculate how much royalty is owed and to whom
     * @dev royalty must be paid in addition to, rather than deducted from, salePrice
     * @param tokenId the ERC721 or ERC1155 token id to query for royalty information
     * @param salePrice the sale price of the given asset
     * @return royaltyReceiver rightful recipient of royalty
     * @return royalty amount of royalty owed
     */
    function _royaltyInfo(
        uint256 tokenId,
        uint256 salePrice
    ) internal view virtual returns (address royaltyReceiver, uint256 royalty) {
        uint256 royaltyBPS = _getRoyaltyBPS(tokenId);

        // intermediate multiplication overflow is theoretically possible here, but
        // not an issue in practice because of practical constraints of salePrice
        return (_getRoyaltyReceiver(tokenId), (royaltyBPS * salePrice) / 10000);
    }

    /**
     * @notice query the royalty rate (denominated in basis points) for given token id
     * @dev implementation supports per-token-id values as well as a global default
     * @param tokenId token whose royalty rate to query
     * @return royaltyBPS royalty rate expressed in basis points
     */
    function _getRoyaltyBPS(
        uint256 tokenId
    ) internal view virtual returns (uint16 royaltyBPS) {
        NFTRoyaltyStorage.Layout storage l = NFTRoyaltyStorage.layout();
        royaltyBPS = l.royaltiesBPS[tokenId];

        if (royaltyBPS == 0) {
            royaltyBPS = l.defaultRoyaltyBPS;
        }
    }

    /**
     * @notice query the royalty receiver for given token id
     * @dev implementation supports per-token-id values as well as a global default
     * @param tokenId token whose royalty receiver to query
     * @return royaltyReceiver royalty receiver
     */
    function _getRoyaltyReceiver(
        uint256 tokenId
    ) internal view virtual returns (address royaltyReceiver) {
        NFTRoyaltyStorage.Layout storage l = NFTRoyaltyStorage.layout();
        royaltyReceiver = l.royaltyReceivers[tokenId];

        if (royaltyReceiver == address(0)) {
            royaltyReceiver = l.defaultRoyaltyReceiver;
        }
    }

    /**
     * @notice set the royalty for given token id
     * @param tokenId token whose royalty to set
     * @param royaltyBPS royalty rate expressed in basis points
     */
    function _setRoyaltyBPS(uint256 tokenId, uint16 royaltyBPS) internal {
        if (royaltyBPS > MAX_ROYALTY) revert NFTRoyalty__RoyaltyTooHigh();
        NFTRoyaltyStorage.layout().royaltiesBPS[tokenId] = royaltyBPS;
    }

    /**
     * @notice set the global default royalty
     * @param defaultRoyaltyBPS royalty rate expressed in basis points
     */
    function _setDefaultRoyaltyBPS(uint16 defaultRoyaltyBPS) internal {
        if (defaultRoyaltyBPS > MAX_ROYALTY)
            revert NFTRoyalty__RoyaltyTooHigh();
        NFTRoyaltyStorage.layout().defaultRoyaltyBPS = defaultRoyaltyBPS;
    }
}
