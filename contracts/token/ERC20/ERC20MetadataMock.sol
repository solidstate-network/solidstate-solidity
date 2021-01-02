// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './ERC20Metadata.sol';

contract ERC20MetadataMock is ERC20Metadata {
  using LibERC20Metadata for LibERC20Metadata.Layout;

  constructor (string memory name, string memory symbol, uint8 decimals) {
    LibERC20Metadata.Layout storage l = LibERC20Metadata.layout();

    l.setName(name);
    l.setSymbol(symbol);
    l.setDecimals(decimals);
  }
}
