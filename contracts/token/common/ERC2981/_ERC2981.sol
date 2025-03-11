// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC2981Storage } from './ERC2981Storage.sol';
import { _IERC2981 } from '../../../interfaces/_IERC2981.sol';

/**
 * @title ERC2981 internal functions
 */
abstract contract _ERC2981 is _IERC2981 {
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
     * @return royaltyBPS royalty rate
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
}
