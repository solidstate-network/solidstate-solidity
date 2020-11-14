// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './LibERC20Metadata.sol';

contract ERC20Metadata {
  constructor (string memory name, string memory symbol, uint8 decimals) {
    _initialize(name, symbol, decimals);
  }

  function _initialize (string memory name, string memory symbol, uint8 decimals) internal {
    LibERC20Metadata.Layout storage l = LibERC20Metadata.layout();
    l.name = name;
    l.symbol = symbol;
    l.decimals = decimals;
  }

  function name () virtual public view returns (string memory) {
    return LibERC20Metadata.layout().name;
  }

  function symbol () virtual public view returns (string memory) {
    return LibERC20Metadata.layout().symbol;
  }

  function decimals () virtual public view returns (uint8) {
    return LibERC20Metadata.layout().decimals;
  }
}
