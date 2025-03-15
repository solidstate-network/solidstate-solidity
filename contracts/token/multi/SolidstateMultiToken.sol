// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { MultiTokenBase } from './base/MultiTokenBase.sol';
import { _MultiTokenBase } from './base/_MultiTokenBase.sol';
import { MultiTokenEnumerable } from './enumerable/MultiTokenEnumerable.sol';
import { _MultiTokenEnumerable } from './enumerable/_MultiTokenEnumerable.sol';
import { MultiTokenMetadata } from './metadata/MultiTokenMetadata.sol';
import { ISolidstateMultiToken } from './ISolidstateMultiToken.sol';
import { _SolidstateMultiToken } from './_SolidstateMultiToken.sol';

/**
 * @title Solidstate MultiToken implementation
 */
abstract contract SolidstateMultiToken is
    ISolidstateMultiToken,
    _SolidstateMultiToken,
    MultiTokenBase,
    MultiTokenEnumerable,
    MultiTokenMetadata
{
    /**
     * @inheritdoc MultiTokenEnumerable
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
        override(_SolidstateMultiToken, _MultiTokenBase, MultiTokenEnumerable)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
