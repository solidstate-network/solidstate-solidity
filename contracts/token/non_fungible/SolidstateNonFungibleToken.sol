// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { NonFungibleTokenBase } from './base/NonFungibleTokenBase.sol';
import { _NonFungibleTokenBase } from './base/NonFungibleTokenBase.sol';
import { NonFungibleTokenEnumerable } from './enumerable/NonFungibleTokenEnumerable.sol';
import { NonFungibleTokenMetadata } from './metadata/NonFungibleTokenMetadata.sol';
import { _NonFungibleTokenMetadata } from './metadata/_NonFungibleTokenMetadata.sol';
import { ISolidstateNonFungibleToken } from './ISolidstateNonFungibleToken.sol';
import { _SolidstateNonFungibleToken } from './_SolidstateNonFungibleToken.sol';

/**
 * @title Solidstate NonFungibleToken implementation, including recommended extensions
 */
abstract contract SolidstateNonFungibleToken is
    ISolidstateNonFungibleToken,
    _SolidstateNonFungibleToken,
    NonFungibleTokenBase,
    NonFungibleTokenEnumerable,
    NonFungibleTokenMetadata
{
    /**
     * @inheritdoc _NonFungibleTokenBase
     * @notice ERC721 hook: revert if value is included in external approve function call
     */
    function _handleApproveMessageValue(
        address operator,
        uint256 tokenId,
        uint256 value
    )
        internal
        virtual
        override(_NonFungibleTokenBase, _SolidstateNonFungibleToken)
    {
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
    )
        internal
        virtual
        override(_NonFungibleTokenBase, _SolidstateNonFungibleToken)
    {
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
        override(
            _NonFungibleTokenBase,
            _NonFungibleTokenMetadata,
            _SolidstateNonFungibleToken
        )
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
