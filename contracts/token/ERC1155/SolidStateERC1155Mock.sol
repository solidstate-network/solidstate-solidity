// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { SolidStateERC1155 } from './SolidStateERC1155.sol';
import { IERC1155 } from './IERC1155.sol';
import { ERC165Storage } from '../../introspection/ERC165Storage.sol';
import { IERC165 } from '../../introspection/IERC165.sol';

contract SolidStateERC1155Mock is SolidStateERC1155 {
    using ERC165Storage for ERC165Storage.Layout;

    constructor() {
        ERC165Storage.layout().setSupportedInterface(
            type(IERC165).interfaceId,
            true
        );
        ERC165Storage.layout().setSupportedInterface(
            type(IERC1155).interfaceId,
            true
        );
    }

    function __mint(
        address account,
        uint256 id,
        uint256 amount
    ) external {
        _mint(account, id, amount, '');
    }

    function __burn(
        address account,
        uint256 id,
        uint256 amount
    ) external {
        _burn(account, id, amount);
    }
}
