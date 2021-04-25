// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './ReentrancyGuardStorage.sol';

abstract contract ReentrancyGuard {
  modifier nonReentrant () {
    ReentrancyGuardStorage.Layout storage l = ReentrancyGuardStorage.layout();
    require(l.status != 2, 'ReentrancyGuard: reentrant call');
    l.status = 2;
    _;
    l.status = 1;
  }
}
