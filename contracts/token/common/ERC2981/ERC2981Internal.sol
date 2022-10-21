// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { ERC2981Storage } from './ERC2981Storage.sol';
import { IERC2981Internal } from '../../../interfaces/IERC2981Internal.sol';

/**
 * @title ERC2981 internal functions
 */
abstract contract ERC2981Internal is IERC2981Internal {
    function _royaltyInfo(uint256 tokenId, uint256 salePrice)
        internal
        view
        virtual
        returns (address, uint256)
    {
        uint256 royalty = _getRoyaltyBPS(tokenId);
        if (royalty > 10000) revert ERC2981Internal__RoyaltyExceedsMax();
        return (_getRoyaltyReceiver(tokenId), (royalty * salePrice) / 10000);
    }

    function _getRoyaltyBPS(uint256 tokenId)
        internal
        view
        virtual
        returns (uint16 royaltyBPS)
    {
        ERC2981Storage.Layout storage l = ERC2981Storage.layout();
        royaltyBPS = l.royaltiesBPS[tokenId];

        if (royaltyBPS == 0) {
            royaltyBPS = l.defaultRoyaltyBPS;
        }
    }

    function _getRoyaltyReceiver(uint256 tokenId)
        internal
        view
        virtual
        returns (address royaltyReceiver)
    {
        ERC2981Storage.Layout storage l = ERC2981Storage.layout();
        royaltyReceiver = l.royaltyReceivers[tokenId];

        if (royaltyReceiver == address(0)) {
            royaltyReceiver = l.defaultRoyaltyReceiver;
        }
    }
}
