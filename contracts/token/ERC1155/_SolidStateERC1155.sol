// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _ERC1155Base } from './base/ERC1155Base.sol';
import { _ERC1155Enumerable } from './enumerable/_ERC1155Enumerable.sol';
import { _ERC1155Metadata } from './metadata/_ERC1155Metadata.sol';
import { _ISolidStateERC1155 } from './_ISolidStateERC1155.sol';

abstract contract _SolidStateERC1155 is
    _ISolidStateERC1155,
    _ERC1155Base,
    _ERC1155Enumerable,
    _ERC1155Metadata
{
    /**
     * @inheritdoc _ERC1155Base
     */
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(_ERC1155Base, _ERC1155Enumerable) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
