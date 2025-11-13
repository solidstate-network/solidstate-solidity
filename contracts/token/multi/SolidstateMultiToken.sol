// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { MultiTokenEnumerable } from './enumerable/MultiTokenEnumerable.sol';
import { MultiTokenMetadata } from './metadata/MultiTokenMetadata.sol';
import { _MultiToken } from './_MultiToken.sol';
import { _SolidstateMultiToken } from './_SolidstateMultiToken.sol';
import { ISolidstateMultiToken } from './ISolidstateMultiToken.sol';
import { MultiToken } from './MultiToken.sol';

/**
 * @title Solidstate MultiToken implementation
 */
abstract contract SolidstateMultiToken is
    ISolidstateMultiToken,
    _SolidstateMultiToken,
    MultiToken,
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
        override(_SolidstateMultiToken, _MultiToken, MultiTokenEnumerable)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
