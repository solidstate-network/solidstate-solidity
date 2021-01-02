// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './ERC165.sol';

contract ERC165Mock is ERC165 {
  using LibERC165 for LibERC165.Layout;

  constructor () {
    LibERC165.layout().setSupportedInterface(type(IERC165).interfaceId, true);
  }
}
