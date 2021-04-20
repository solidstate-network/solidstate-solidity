// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './ERC1155Enumerable.sol';

contract ERC1155EnumerableMock is ERC1155Enumerable {
  using ERC165Storage for ERC165Storage.Layout;

  constructor () {
    ERC165Storage.layout().setSupportedInterface(type(IERC165).interfaceId, true);
    ERC165Storage.layout().setSupportedInterface(type(IERC1155).interfaceId, true);
  }
}
