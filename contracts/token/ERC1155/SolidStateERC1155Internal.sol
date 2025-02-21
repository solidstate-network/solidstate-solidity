// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC165BaseInternal } from '../../introspection/ERC165/base/ERC165BaseInternal.sol';
import { ERC1155BaseInternal } from './base/ERC1155Base.sol';
import { ERC1155EnumerableInternal } from './enumerable/ERC1155EnumerableInternal.sol';
import { ERC1155MetadataInternal } from './metadata/ERC1155MetadataInternal.sol';
import { ISolidStateERC1155Internal } from './ISolidStateERC1155Internal.sol';

abstract contract SolidStateERC1155Internal is
    ISolidStateERC1155Internal,
    ERC1155BaseInternal,
    ERC1155EnumerableInternal,
    ERC1155MetadataInternal,
    ERC165BaseInternal
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
