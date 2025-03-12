// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _ERC721Base } from './base/_ERC721Base.sol';
import { _ERC721Enumerable } from './enumerable/_ERC721Enumerable.sol';
import { _ERC721Metadata } from './metadata/_ERC721Metadata.sol';
import { _ISolidstateERC721 } from './_ISolidstateERC721.sol';

abstract contract _SolidstateERC721 is
    _ISolidstateERC721,
    _ERC721Base,
    _ERC721Enumerable,
    _ERC721Metadata
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
        if (value > 0) revert SolidstateERC721__PayableApproveNotSupported();
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
        if (value > 0) revert SolidstateERC721__PayableTransferNotSupported();
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
