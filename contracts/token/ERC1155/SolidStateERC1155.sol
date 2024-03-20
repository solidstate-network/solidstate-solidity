// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC165Base } from '../../introspection/ERC165/base/ERC165Base.sol';
import { ERC1155Base, ERC1155BaseInternal } from './base/ERC1155Base.sol';
import { ERC1155Enumerable } from './enumerable/ERC1155Enumerable.sol';
import { ERC1155EnumerableInternal } from './enumerable/ERC1155EnumerableInternal.sol';
import { ERC1155Metadata } from './metadata/ERC1155Metadata.sol';
import { ISolidStateERC1155 } from './ISolidStateERC1155.sol';

/**
 * @title SolidState ERC1155 implementation
 */
abstract contract SolidStateERC1155 is
    ISolidStateERC1155,
    ERC1155Base,
    ERC1155Enumerable,
    ERC1155Metadata,
    ERC165Base
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
    )
        internal
        virtual
        override(ERC1155BaseInternal, ERC1155EnumerableInternal)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
