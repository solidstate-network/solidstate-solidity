// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './ERC20.sol';

contract ERC20Mock is ERC20 {
  constructor (
    string memory name,
    string memory symbol,
    uint8 decimals,
    uint supply
  ) {
    LibERC20Metadata.initialize(name, symbol, decimals);
    _mint(msg.sender, supply);
  }
}
