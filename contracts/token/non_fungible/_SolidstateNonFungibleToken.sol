// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _NonFungibleTokenBase } from './base/_NonFungibleTokenBase.sol';
import { _NonFungibleTokenEnumerable } from './enumerable/_NonFungibleTokenEnumerable.sol';
import { _NonFungibleTokenMetadata } from './metadata/_NonFungibleTokenMetadata.sol';
import { _ISolidstateNonFungibleToken } from './_ISolidstateNonFungibleToken.sol';

abstract contract _SolidstateNonFungibleToken is
    _ISolidstateNonFungibleToken,
    _NonFungibleTokenBase,
    _NonFungibleTokenEnumerable,
    _NonFungibleTokenMetadata
{
    /**
     * @inheritdoc _NonFungibleTokenBase
     * @notice ERC721 hook: revert if value is included in external approve function call
     */
    function _handleApproveMessageValue(
        address operator,
        uint256 tokenId,
        uint256 value
    ) internal virtual override {
        if (value > 0)
            revert SolidstateNonFungibleToken__PayableApproveNotSupported();
        super._handleApproveMessageValue(operator, tokenId, value);
    }

    /**
     * @inheritdoc _NonFungibleTokenBase
     * @notice ERC721 hook: revert if value is included in external transfer function call
     */
    function _handleTransferMessageValue(
        address from,
        address to,
        uint256 tokenId,
        uint256 value
    ) internal virtual override {
        if (value > 0)
            revert SolidstateNonFungibleToken__PayableTransferNotSupported();
        super._handleTransferMessageValue(from, to, tokenId, value);
    }

    /**
     * @inheritdoc _NonFungibleTokenBase
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    )
        internal
        virtual
        override(_NonFungibleTokenBase, _NonFungibleTokenMetadata)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
