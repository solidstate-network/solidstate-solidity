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
        returns (uint256)
    {
        ERC2981Storage.Layout storage l = ERC2981Storage.layout();
        uint16 localRoyalty = l.royalties[tokenId];
        return localRoyalty > 0 ? localRoyalty : l.royaltyBPS;
    }

    function _getRoyaltyReceiver(uint256 tokenId)
        internal
        view
        virtual
        returns (address)
    {
        ERC2981Storage.Layout storage l = ERC2981Storage.layout();
        address localReceiver = l.royaltyReceivers[tokenId];
        return
            localReceiver == address(0)
                ? l.defaultRoyaltyReceiver
                : localReceiver;
    }
}
