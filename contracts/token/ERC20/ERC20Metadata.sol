// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './ERC20Base.sol';
import './LibERC20Metadata.sol';

abstract contract ERC20Metadata is ERC20Base {
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
