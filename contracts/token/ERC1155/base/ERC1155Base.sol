// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1155 } from '../../../interfaces/IERC1155.sol';
import { ERC165Base } from '../../../introspection/ERC165/base/ERC165Base.sol';
import { IERC1155Base } from './IERC1155Base.sol';
import { _ERC1155Base } from './_ERC1155Base.sol';

/**
 * @title Base ERC1155 contract
 * @dev derived from https://github.com/OpenZeppelin/openzeppelin-contracts/ (MIT license)
 */
abstract contract ERC1155Base is IERC1155Base, _ERC1155Base, ERC165Base {
    /**
     * @inheritdoc IERC1155
     */
    function balanceOf(
        address account,
        uint256 id
    ) external view returns (uint256) {
        return _balanceOf(account, id);
    }

    /**
     * @inheritdoc IERC1155
     */
    function balanceOfBatch(
        address[] memory accounts,
        uint256[] memory ids
    ) external view returns (uint256[] memory) {
        return _balanceOfBatch(accounts, ids);
    }

    /**
     * @inheritdoc IERC1155
     */
    function isApprovedForAll(
        address account,
        address operator
    ) external view returns (bool) {
        return _isApprovedForAll(account, operator);
    }

    /**
     * @inheritdoc IERC1155
     */
    function setApprovalForAll(address operator, bool status) external {
        _setApprovalForAll(operator, status);
    }

    /**
     * @inheritdoc IERC1155
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external {
        _safeTransferFrom(from, to, id, amount, data);
    }

    /**
     * @inheritdoc IERC1155
     */
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) external {
        _safeBatchTransferFrom(from, to, ids, amounts, data);
    }
}
