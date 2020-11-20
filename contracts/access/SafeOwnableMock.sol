// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './SafeOwnable.sol';

contract SafeOwnableMock is SafeOwnable {
  constructor (address owner) {
    LibOwnable.initialize(owner);
  }
}
