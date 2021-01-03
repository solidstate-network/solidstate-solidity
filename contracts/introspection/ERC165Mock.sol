// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './ERC165.sol';

contract ERC165Mock is ERC165 {
  using ERC165Storage for ERC165Storage.Layout;

  constructor () {
    ERC165Storage.layout().setSupportedInterface(type(IERC165).interfaceId, true);
  }
}
