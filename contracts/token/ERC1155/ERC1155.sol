// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { ERC165 } from '../../introspection/ERC165.sol';
import { ERC1155Base, ERC1155BaseInternal } from './base/ERC1155Base.sol';
import { ERC1155Enumerable } from './enumerable/ERC1155Enumerable.sol';
import { ERC1155Metadata } from './metadata/ERC1155Metadata.sol';

/**
 * @title SolidState ERC1155 implementation
 */
abstract contract ERC1155 is
    ERC1155Base,
    ERC1155Enumerable,
    ERC1155Metadata,
    ERC165
{
    /**
     * @inheritdoc ERC1155BaseInternal
     */
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155BaseInternal, ERC1155Enumerable) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
