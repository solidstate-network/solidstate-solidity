// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './ERC165.sol';

contract ERC165Mock is ERC165 {
  constructor () {
    LibERC165.initialize();
  }
}
