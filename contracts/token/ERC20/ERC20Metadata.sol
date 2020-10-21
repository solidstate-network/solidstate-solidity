// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './ERC20MetadataStorage.sol';

contract ERC20Metadata is ERC20MetadataStorage {
  constructor (string memory name, string memory symbol, uint8 decimals) {
    _initialize(name, symbol, decimals);
  }

  function _initialize (string memory name, string memory symbol, uint8 decimals) internal {
    ERC20MetadataStorageLayout storage ds = _ds_ERC20Metadata();
    ds.name = name;
    ds.symbol = symbol;
    ds.decimals = decimals;
  }

  function name () virtual public view returns (string memory) {
    return _ds_ERC20Metadata().name;
  }

  function symbol () virtual public view returns (string memory) {
    return _ds_ERC20Metadata().symbol;
  }

  function decimals () virtual public view returns (uint8) {
    return _ds_ERC20Metadata().decimals;
  }
}
