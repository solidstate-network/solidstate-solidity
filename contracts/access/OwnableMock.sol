// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './Ownable.sol';

contract OwnableMock is Ownable {
  constructor (address owner) {
    LibOwnable.initialize(owner);
  }
}
