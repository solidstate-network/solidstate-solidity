// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './SafeOwnable.sol';

contract SafeOwnableMock is SafeOwnable {
  using LibOwnable for LibOwnable.Layout;

  constructor (address owner) {
    LibOwnable.layout().setOwner(owner);
  }
}
