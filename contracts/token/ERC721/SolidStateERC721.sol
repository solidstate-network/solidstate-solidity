// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC165Base } from '../../introspection/ERC165/base/ERC165Base.sol';
import { ERC721Base, ERC721BaseInternal } from './base/ERC721Base.sol';
import { ERC721Enumerable } from './enumerable/ERC721Enumerable.sol';
import { ERC721Metadata } from './metadata/ERC721Metadata.sol';
import { ERC721MetadataInternal } from './metadata/ERC721MetadataInternal.sol';
import { ISolidStateERC721 } from './ISolidStateERC721.sol';
import { SolidStateERC721Internal } from './SolidStateERC721Internal.sol';

/**
 * @title SolidState ERC721 implementation, including recommended extensions
 */
abstract contract SolidStateERC721 is
    ISolidStateERC721,
    SolidStateERC721Internal,
    ERC721Base,
    ERC721Enumerable,
    ERC721Metadata,
    ERC165Base
{
    /**
     * @inheritdoc ERC721BaseInternal
     * @notice ERC721 hook: revert if value is included in external approve function call
     */
    function _handleApproveMessageValue(
        address operator,
        uint256 tokenId,
        uint256 value
    ) internal virtual override(ERC721BaseInternal, SolidStateERC721Internal) {
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
    ) internal virtual override(ERC721BaseInternal, SolidStateERC721Internal) {
        super._handleTransferMessageValue(from, to, tokenId, value);
    }

    /**
     * @inheritdoc ERC721BaseInternal
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    )
        internal
        virtual
        override(
            ERC721BaseInternal,
            ERC721MetadataInternal,
            SolidStateERC721Internal
        )
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
