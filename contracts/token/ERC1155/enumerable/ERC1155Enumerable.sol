// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1155Enumerable } from './IERC1155Enumerable.sol';
import { _ERC1155Enumerable } from './_ERC1155Enumerable.sol';

/**
 * @title ERC1155 implementation including enumerable and aggregate functions
 */
abstract contract ERC1155Enumerable is IERC1155Enumerable, _ERC1155Enumerable {
    /**
     * @inheritdoc IERC1155Enumerable
     */
    function totalSupply(uint256 id) external view returns (uint256) {
        return _totalSupply(id);
    }

    /**
     * @inheritdoc IERC1155Enumerable
     */
    function totalHolders(uint256 id) external view returns (uint256) {
        return _totalHolders(id);
    }

    /**
     * @inheritdoc IERC1155Enumerable
     */
    function accountsByToken(
        uint256 id
    ) external view returns (address[] memory) {
        return _accountsByToken(id);
    }

    /**
     * @inheritdoc IERC1155Enumerable
     */
    function tokensByAccount(
        address account
    ) external view returns (uint256[] memory) {
        return _tokensByAccount(account);
    }
}
