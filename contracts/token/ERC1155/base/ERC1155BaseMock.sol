// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {IERC165, ERC165, ERC165Storage} from '../../../introspection/ERC165.sol';
import {ERC1155Base, IERC1155} from './ERC1155Base.sol';

contract ERC1155BaseMock is ERC1155Base, ERC165 {
  using ERC165Storage for ERC165Storage.Layout;

  constructor () {
    ERC165Storage.layout().setSupportedInterface(type(IERC165).interfaceId, true);
    ERC165Storage.layout().setSupportedInterface(type(IERC1155).interfaceId, true);
  }

  function __mint (
    address account,
    uint id,
    uint amount
  ) external {
    _mint(account, id, amount, '');
  }

  function __safeMint (
    address account,
    uint id,
    uint amount
  ) external {
    _safeMint(account, id, amount, '');
  }

  function __mintBatch (
    address account,
    uint[] memory ids,
    uint[] memory amounts
  ) external {
    _mintBatch(account, ids, amounts, '');
  }

  function __safeMintBatch (
    address account,
    uint[] memory ids,
    uint[] memory amounts
  ) external {
    _safeMintBatch(account, ids, amounts, '');
  }

  function __burn (
    address account,
    uint id,
    uint amount
  ) external {
    _burn(account, id, amount);
  }

  function __burnBatch (
    address account,
    uint[] memory ids,
    uint[] memory amounts
  ) external {
    _burnBatch(account, ids, amounts);
  }

  function __transfer (
    address operator,
    address sender,
    address recipient,
    uint id,
    uint amount,
    bytes memory data
  ) external {
    _transfer(operator, sender, recipient, id, amount, data);
  }

  function __safeTransfer (
    address operator,
    address sender,
    address recipient,
    uint id,
    uint amount,
    bytes memory data
  ) external {
    _safeTransfer(operator, sender, recipient, id, amount, data);
  }

  function __transferBatch (
    address operator,
    address sender,
    address recipient,
    uint[] memory ids,
    uint[] memory amounts,
    bytes memory data
  ) external {
    _transferBatch(operator, sender, recipient, ids, amounts, data);
  }

  function __safeTransferBatch (
    address operator,
    address sender,
    address recipient,
    uint[] memory ids,
    uint[] memory amounts,
    bytes memory data
  ) external {
    _safeTransferBatch(operator, sender, recipient, ids, amounts, data);
  }
}
