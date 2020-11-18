// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './ERC20Metadata.sol';

contract ERC20MetadataMock is ERC20Metadata {
  constructor (
    string memory name, string memory symbol, uint8 decimals
  ) ERC20Metadata(name, symbol, decimals) {}
}
