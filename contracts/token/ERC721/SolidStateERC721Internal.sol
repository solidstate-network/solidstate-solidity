// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC165BaseInternal } from '../../introspection/ERC165/base/ERC165BaseInternal.sol';
import { ERC721BaseInternal } from './base/ERC721BaseInternal.sol';
import { ERC721EnumerableInternal } from './enumerable/ERC721EnumerableInternal.sol';
import { ERC721MetadataInternal } from './metadata/ERC721MetadataInternal.sol';
import { ISolidStateERC721Internal } from './ISolidStateERC721Internal.sol';

abstract contract SolidStateERC721Internal is
    ISolidStateERC721Internal,
    ERC721BaseInternal,
    ERC721EnumerableInternal,
    ERC721MetadataInternal,
    ERC165BaseInternal
{
    /**
     * @inheritdoc ERC721BaseInternal
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
     * @inheritdoc ERC721BaseInternal
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
     * @inheritdoc ERC721BaseInternal
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721BaseInternal, ERC721MetadataInternal) {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
