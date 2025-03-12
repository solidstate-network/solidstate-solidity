// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC721Base } from './base/ERC721Base.sol';
import { _ERC721Base } from './base/ERC721Base.sol';
import { ERC721Enumerable } from './enumerable/ERC721Enumerable.sol';
import { ERC721Metadata } from './metadata/ERC721Metadata.sol';
import { _ERC721Metadata } from './metadata/_ERC721Metadata.sol';
import { ISolidStateERC721 } from './ISolidStateERC721.sol';
import { _SolidStateERC721 } from './_SolidStateERC721.sol';

/**
 * @title Solidstate ERC721 implementation, including recommended extensions
 */
abstract contract SolidStateERC721 is
    ISolidStateERC721,
    _SolidStateERC721,
    ERC721Base,
    ERC721Enumerable,
    ERC721Metadata
{
    /**
     * @inheritdoc _ERC721Base
     * @notice ERC721 hook: revert if value is included in external approve function call
     */
    function _handleApproveMessageValue(
        address operator,
        uint256 tokenId,
        uint256 value
    ) internal virtual override(_ERC721Base, _SolidStateERC721) {
        super._handleApproveMessageValue(operator, tokenId, value);
    }

    /**
     * @inheritdoc _ERC721Base
     * @notice ERC721 hook: revert if value is included in external transfer function call
     */
    function _handleTransferMessageValue(
        address from,
        address to,
        uint256 tokenId,
        uint256 value
    ) internal virtual override(_ERC721Base, _SolidStateERC721) {
        super._handleTransferMessageValue(from, to, tokenId, value);
    }

    /**
     * @inheritdoc _ERC721Base
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    )
        internal
        virtual
        override(_ERC721Base, _ERC721Metadata, _SolidStateERC721)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
