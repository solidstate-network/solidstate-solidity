// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC165 } from '../../../interfaces/IERC165.sol';
import { ERC165Base } from '../../../introspection/ERC165/base/ERC165Base.sol';
import { ERC1155Base, IERC1155 } from './ERC1155Base.sol';

contract ERC1155BaseMock is ERC1155Base, ERC165Base {
    constructor() {
        _setSupportsInterface(type(IERC165).interfaceId, true);
        _setSupportsInterface(type(IERC1155).interfaceId, true);
    }

    function __mint(address account, uint256 id, uint256 amount) external {
        _mint(account, id, amount, '');
    }

    function __safeMint(address account, uint256 id, uint256 amount) external {
        _safeMint(account, id, amount, '');
    }

    function __mintBatch(
        address account,
        uint256[] memory ids,
        uint256[] memory amounts
    ) external {
        _mintBatch(account, ids, amounts, '');
    }

    function __safeMintBatch(
        address account,
        uint256[] memory ids,
        uint256[] memory amounts
    ) external {
        _safeMintBatch(account, ids, amounts, '');
    }

    function __burn(address account, uint256 id, uint256 amount) external {
        _burn(account, id, amount);
    }

    function __burnBatch(
        address account,
        uint256[] memory ids,
        uint256[] memory amounts
    ) external {
        _burnBatch(account, ids, amounts);
    }

    function __transfer(
        address operator,
        address sender,
        address recipient,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external {
        _transfer(operator, sender, recipient, id, amount, data);
    }

    function __safeTransfer(
        address operator,
        address sender,
        address recipient,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external {
        _safeTransfer(operator, sender, recipient, id, amount, data);
    }

    function __transferBatch(
        address operator,
        address sender,
        address recipient,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) external {
        _transferBatch(operator, sender, recipient, ids, amounts, data);
    }

    function __safeTransferBatch(
        address operator,
        address sender,
        address recipient,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) external {
        _safeTransferBatch(operator, sender, recipient, ids, amounts, data);
    }
}
