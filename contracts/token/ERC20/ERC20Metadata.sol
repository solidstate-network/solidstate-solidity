// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './ERC20Base.sol';
import './ERC20MetadataStorage.sol';

abstract contract ERC20Metadata is ERC20Base {
  function name () virtual public view returns (string memory) {
    return ERC20MetadataStorage.layout().name;
  }

  function symbol () virtual public view returns (string memory) {
    return ERC20MetadataStorage.layout().symbol;
  }

  function decimals () virtual public view returns (uint8) {
    return ERC20MetadataStorage.layout().decimals;
  }
}
