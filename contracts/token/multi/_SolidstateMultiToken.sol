// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _MultiTokenBase } from './base/MultiTokenBase.sol';
import { _MultiTokenEnumerable } from './enumerable/_MultiTokenEnumerable.sol';
import { _MultiTokenMetadata } from './metadata/_MultiTokenMetadata.sol';
import { _ISolidstateMultiToken } from './_ISolidstateMultiToken.sol';

abstract contract _SolidstateMultiToken is
    _ISolidstateMultiToken,
    _MultiTokenBase,
    _MultiTokenEnumerable,
    _MultiTokenMetadata
{
    /**
     * @inheritdoc _MultiTokenBase
     */
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(_MultiTokenBase, _MultiTokenEnumerable) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
