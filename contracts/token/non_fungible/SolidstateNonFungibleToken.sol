// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _NonFungibleToken } from './_NonFungibleToken.sol';
import { _SolidstateNonFungibleToken } from './_SolidstateNonFungibleToken.sol';
import { NonFungibleTokenEnumerable } from './enumerable/NonFungibleTokenEnumerable.sol';
import { ISolidstateNonFungibleToken } from './ISolidstateNonFungibleToken.sol';
import { _NonFungibleTokenMetadata } from './metadata/_NonFungibleTokenMetadata.sol';
import { NonFungibleTokenMetadata } from './metadata/NonFungibleTokenMetadata.sol';
import { NonFungibleToken } from './NonFungibleToken.sol';

/**
 * @title Solidstate NonFungibleToken implementation, including recommended extensions
 */
abstract contract SolidstateNonFungibleToken is
    ISolidstateNonFungibleToken,
    _SolidstateNonFungibleToken,
    NonFungibleToken,
    NonFungibleTokenEnumerable,
    NonFungibleTokenMetadata
{
    /**
     * @inheritdoc _NonFungibleToken
     * @notice ERC721 hook: revert if value is included in external approve function call
     */
    function _handleApproveMessageValue(
        address operator,
        uint256 tokenId,
        uint256 value
    )
        internal
        virtual
        override(_NonFungibleToken, _SolidstateNonFungibleToken)
    {
        super._handleApproveMessageValue(operator, tokenId, value);
    }

    /**
     * @inheritdoc _NonFungibleToken
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
        override(_NonFungibleToken, _SolidstateNonFungibleToken)
    {
        super._handleTransferMessageValue(from, to, tokenId, value);
    }

    /**
     * @inheritdoc _NonFungibleToken
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    )
        internal
        virtual
        override(
            _NonFungibleToken,
            _NonFungibleTokenMetadata,
            _SolidstateNonFungibleToken
        )
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
