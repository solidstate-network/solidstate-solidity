// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC1155Base } from './base/ERC1155Base.sol';
import { _ERC1155Base } from './base/_ERC1155Base.sol';
import { ERC1155Enumerable } from './enumerable/ERC1155Enumerable.sol';
import { _ERC1155Enumerable } from './enumerable/_ERC1155Enumerable.sol';
import { ERC1155Metadata } from './metadata/ERC1155Metadata.sol';
import { ISolidstateERC1155 } from './ISolidstateERC1155.sol';
import { _SolidstateERC1155 } from './_SolidstateERC1155.sol';

/**
 * @title Solidstate ERC1155 implementation
 */
abstract contract SolidstateERC1155 is
    ISolidstateERC1155,
    _SolidstateERC1155,
    ERC1155Base,
    ERC1155Enumerable,
    ERC1155Metadata
{
    /**
     * @inheritdoc ERC1155Enumerable
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
        override(_SolidstateERC1155, _ERC1155Base, ERC1155Enumerable)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
