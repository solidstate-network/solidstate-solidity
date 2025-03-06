// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC165 } from '../../../interfaces/IERC165.sol';
import { IERC1155 } from '../../../interfaces/IERC1155.sol';
import { ERC165Base } from '../../../introspection/ERC165/base/ERC165Base.sol';
import { ERC1155Base } from '../base/ERC1155Base.sol';
import { _ERC1155Base } from '../base/_ERC1155Base.sol';
import { ERC1155Enumerable } from './ERC1155Enumerable.sol';
import { _ERC1155Enumerable } from './_ERC1155Enumerable.sol';

contract ERC1155EnumerableMock is ERC1155Enumerable, ERC1155Base, ERC165Base {
    constructor() {
        _setSupportsInterface(type(IERC165).interfaceId, true);
        _setSupportsInterface(type(IERC1155).interfaceId, true);
    }

    function __mint(address account, uint256 id, uint256 amount) external {
        _mint(account, id, amount, '');
    }

    function __burn(address account, uint256 id, uint256 amount) external {
        _burn(account, id, amount);
    }

    /**
     * @notice ERC1155 hook: update aggregate values
     * @inheritdoc _ERC1155Enumerable
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
