// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _MultiTokenEnumerable } from './enumerable/_MultiTokenEnumerable.sol';
import { _MultiTokenMetadata } from './metadata/_MultiTokenMetadata.sol';
import { _MultiToken } from './MultiToken.sol';
import { _ISolidstateMultiToken } from './_ISolidstateMultiToken.sol';

abstract contract _SolidstateMultiToken is
    _ISolidstateMultiToken,
    _MultiToken,
    _MultiTokenEnumerable,
    _MultiTokenMetadata
{
    /**
     * @inheritdoc _MultiToken
     */
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(_MultiToken, _MultiTokenEnumerable) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
