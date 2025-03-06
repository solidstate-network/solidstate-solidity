// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _ERC165Base } from '../../introspection/ERC165/base/_ERC165Base.sol';
import { _ERC721Base } from './base/_ERC721Base.sol';
import { _ERC721Enumerable } from './enumerable/_ERC721Enumerable.sol';
import { _ERC721Metadata } from './metadata/_ERC721Metadata.sol';
import { _ISolidStateERC721 } from './_ISolidStateERC721.sol';

abstract contract _SolidStateERC721 is
    _ISolidStateERC721,
    _ERC721Base,
    _ERC721Enumerable,
    _ERC721Metadata,
    _ERC165Base
{
    /**
     * @inheritdoc _ERC721Base
     * @notice ERC721 hook: revert if value is included in external approve function call
     */
    function _handleApproveMessageValue(
        address operator,
        uint256 tokenId,
        uint256 value
    ) internal virtual override {
        if (value > 0) revert SolidStateERC721__PayableApproveNotSupported();
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
    ) internal virtual override {
        if (value > 0) revert SolidStateERC721__PayableTransferNotSupported();
        super._handleTransferMessageValue(from, to, tokenId, value);
    }

    /**
     * @inheritdoc _ERC721Base
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(_ERC721Base, _ERC721Metadata) {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
