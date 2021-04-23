// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './ERC1155.sol';

contract ERC1155Mock is ERC1155 {
  using ERC165Storage for ERC165Storage.Layout;

  constructor () {
    ERC165Storage.layout().setSupportedInterface(type(IERC165).interfaceId, true);
    ERC165Storage.layout().setSupportedInterface(type(IERC1155).interfaceId, true);
  }
}
