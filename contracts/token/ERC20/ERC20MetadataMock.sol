// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './ERC20Metadata.sol';

contract ERC20MetadataMock is ERC20Metadata {
  using ERC20MetadataStorage for ERC20MetadataStorage.Layout;

  constructor (string memory name, string memory symbol, uint8 decimals) {
    ERC20MetadataStorage.Layout storage l = ERC20MetadataStorage.layout();

    l.setName(name);
    l.setSymbol(symbol);
    l.setDecimals(decimals);
  }
}
