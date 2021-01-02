// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './ERC20.sol';

contract ERC20Mock is ERC20 {
  using LibERC20Metadata for LibERC20Metadata.Layout;

  constructor (
    string memory name,
    string memory symbol,
    uint8 decimals,
    uint supply
  ) {
    LibERC20Metadata.Layout storage l = LibERC20Metadata.layout();

    l.setName(name);
    l.setSymbol(symbol);
    l.setDecimals(decimals);

    _mint(msg.sender, supply);
  }
}
