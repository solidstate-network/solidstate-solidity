// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ReentrancyGuard } from './ReentrancyGuard.sol';

contract ReentrancyGuardMock is ReentrancyGuard {
    function modifier_nonReentrant() external nonReentrant {
        // do nothing
    }

    function reentrancyTest() external nonReentrant {
        this.reentrancyTest();
    }

    function crossFunctionReentrancyTest() external nonReentrant {
        this.reentrancyTest();
    }

    function __lockReentrancyGuard() external {
        _lockReentrancyGuard();
    }

    function __unlockReentrancyGuard() external {
        _unlockReentrancyGuard();
    }
}
