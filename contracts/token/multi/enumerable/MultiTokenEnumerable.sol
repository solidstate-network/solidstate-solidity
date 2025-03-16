// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { MultiTokenBase } from '../base/MultiTokenBase.sol';
import { _MultiTokenBase } from '../base/_MultiTokenBase.sol';
import { IMultiTokenEnumerable } from './IMultiTokenEnumerable.sol';
import { _MultiTokenEnumerable } from './_MultiTokenEnumerable.sol';

/**
 * @title MultiToken implementation including enumerable and aggregate functions
 */
abstract contract MultiTokenEnumerable is
    IMultiTokenEnumerable,
    _MultiTokenEnumerable,
    MultiTokenBase
{
    /**
     * @inheritdoc IMultiTokenEnumerable
     */
    function totalSupply(uint256 id) external view returns (uint256) {
        return _totalSupply(id);
    }

    /**
     * @inheritdoc IMultiTokenEnumerable
     */
    function totalHolders(uint256 id) external view returns (uint256) {
        return _totalHolders(id);
    }

    /**
     * @inheritdoc IMultiTokenEnumerable
     */
    function accountsByToken(
        uint256 id
    ) external view returns (address[] memory) {
        return _accountsByToken(id);
    }

    /**
     * @inheritdoc IMultiTokenEnumerable
     */
    function tokensByAccount(
        address account
    ) external view returns (uint256[] memory) {
        return _tokensByAccount(account);
    }

    /**
     * @inheritdoc _MultiTokenEnumerable
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
