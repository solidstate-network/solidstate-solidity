// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './Ownable.sol';

contract OwnableMock is Ownable {
  using LibOwnable for LibOwnable.Layout;

  constructor (address owner) {
    LibOwnable.layout().setOwner(owner);
  }
}
