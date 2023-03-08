// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { ReentrancyGuard } from './ReentrancyGuard.sol';

contract ReentrancyGuardMock is ReentrancyGuard {
    function nonReentrancyTest() external nonReentrant {
        // do nothing
    }

    function reentrancyTest() external nonReentrant {
        this.reentrancyTest();
    }

    function crossFunctionReentrancyTest() external nonReentrant {
        this.reentrancyTest();
    }
}
