// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './OwnableStorage.sol';

abstract contract OwnableInternal {
  using OwnableStorage for OwnableStorage.Layout;

  modifier onlyOwner {
    require(
      msg.sender == OwnableStorage.layout().owner,
      'Ownable: sender must be owner'
    );
    _;
  }
}
