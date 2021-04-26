// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './ReentrancyGuard.sol';

contract ReentrancyGuardMock is ReentrancyGuard {
  function reentrancyTest () external nonReentrant {
    this.reentrancyTest();
  }

  function crossFunctionReentrancyTest () external nonReentrant {
    this.reentrancyTest();
  }
}
