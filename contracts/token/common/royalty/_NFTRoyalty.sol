// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _Introspectable } from '../../../introspection/_Introspectable.sol';
import { _INFTRoyalty } from './_INFTRoyalty.sol';
import { ERC2981Storage } from '../../../storage/ERC2981Storage.sol';

/**
 * @title NFTRoyalty internal functions
 */
abstract contract _NFTRoyalty is _INFTRoyalty, _Introspectable {
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
        ERC2981Storage.Layout storage $ = ERC2981Storage.layout(
            ERC2981Storage.DEFAULT_STORAGE_SLOT
        );
        royaltyBPS = $.royaltiesBPS[tokenId];

        if (royaltyBPS == 0) {
            royaltyBPS = $.defaultRoyaltyBPS;
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
        ERC2981Storage.Layout storage $ = ERC2981Storage.layout(
            ERC2981Storage.DEFAULT_STORAGE_SLOT
        );
        royaltyReceiver = $.royaltyReceivers[tokenId];

        if (royaltyReceiver == address(0)) {
            royaltyReceiver = $.defaultRoyaltyReceiver;
        }
    }

    /**
     * @notice set the royalty for given token id
     * @param tokenId token whose royalty to set
     * @param royaltyBPS royalty rate expressed in basis points
     */
    function _setRoyaltyBPS(uint256 tokenId, uint16 royaltyBPS) internal {
        if (royaltyBPS > MAX_ROYALTY) revert NFTRoyalty__RoyaltyTooHigh();
        ERC2981Storage.layout(ERC2981Storage.DEFAULT_STORAGE_SLOT).royaltiesBPS[
            tokenId
        ] = royaltyBPS;
    }

    /**
     * @notice set the global default royalty
     * @param defaultRoyaltyBPS royalty rate expressed in basis points
     */
    function _setDefaultRoyaltyBPS(uint16 defaultRoyaltyBPS) internal {
        if (defaultRoyaltyBPS > MAX_ROYALTY)
            revert NFTRoyalty__RoyaltyTooHigh();
        ERC2981Storage
            .layout(ERC2981Storage.DEFAULT_STORAGE_SLOT)
            .defaultRoyaltyBPS = defaultRoyaltyBPS;
    }

    /**
     * @notice set the royalty receiver for given token id
     * @param tokenId token whose royalty receiver to set
     * @param receiver royalty receiver
     */
    function _setRoyaltyReceiver(uint256 tokenId, address receiver) internal {
        ERC2981Storage
            .layout(ERC2981Storage.DEFAULT_STORAGE_SLOT)
            .royaltyReceivers[tokenId] = receiver;
    }

    /**
     * @notice set the global default royalty receiver
     * @param defaultReceiver royalty receiver
     */
    function _setDefaultRoyaltyReceiver(address defaultReceiver) internal {
        ERC2981Storage
            .layout(ERC2981Storage.DEFAULT_STORAGE_SLOT)
            .defaultRoyaltyReceiver = defaultReceiver;
    }
}
