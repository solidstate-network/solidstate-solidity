// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { ERC2981Storage } from './ERC2981Storage.sol';
import { IERC2981Internal } from '../../../interfaces/IERC2981Internal.sol';

/**
 * @title ERC2981 internal functions
 */
abstract contract ERC2981Internal is IERC2981Internal {
    using ERC2981Storage for ERC2981Storage.Layout;

    function _royaltyInfo(uint256 tokenId, uint256 salePrice)
        internal
        view
        virtual
        returns (address, uint256)
    {
        ERC2981Storage.Layout storage l = ERC2981Storage.layout();

        uint256 royalty = _getRoyaltyBPS(l, tokenId);
        if (royalty > 10000) revert ERC2981Internal__RoyaltyExceedsMax();

        return (l.receiver, (royalty * salePrice) / 10000);
    }

    function _getRoyaltyBPS(ERC2981Storage.Layout storage l, uint256 tokenId)
        internal
        view
        virtual
        returns (uint256)
    {
        uint16 localRoyalty = l.royalties[tokenId];
        return localRoyalty > 0 ? localRoyalty : l.royalty;
    }
}
