// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC165 } from '../../interfaces/IERC165.sol';
import { IERC1155 } from '../../interfaces/IERC1155.sol';
import { SolidStateERC1155 } from './SolidStateERC1155.sol';

contract SolidStateERC1155Mock is SolidStateERC1155 {
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
}
