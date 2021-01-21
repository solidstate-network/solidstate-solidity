// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './ERC1155Base.sol';

contract ERC1155BaseMock is ERC1155Base {
  using ERC165Storage for ERC165Storage.Layout;

  constructor () {
    ERC165Storage.layout().setSupportedInterface(type(IERC165).interfaceId, true);
    ERC165Storage.layout().setSupportedInterface(type(IERC1155).interfaceId, true);
  }

  function mint (
    address account,
    uint id,
    uint amount,
    bytes memory data
  ) external {
    _mint(account, id, amount, data);
  }

  function mintBatch (
    address account,
    uint[] memory ids,
    uint[] memory amounts,
    bytes memory data
  ) external {
    _mintBatch(account, ids, amounts, data);
  }

  function burn (
    address account,
    uint id,
    uint amount
  ) external {
    _burn(account, id, amount);
  }

  function burnBatch (
    address account,
    uint[] memory ids,
    uint[] memory amounts
  ) external {
    _burnBatch(account, ids, amounts);
  }
}
