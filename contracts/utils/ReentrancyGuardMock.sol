// SPDX-License-Identifier: MIT

import './ReentrancyGuard.sol';

contract ReentrancyGuardMock is ReentrancyGuard {
  function reentrancyTest () external nonReentrant {
    this.reentrancyTest();
  }

  function crossFunctionReentrancyTest () external nonReentrant {
    this.reentrancyTest();
  }
}
