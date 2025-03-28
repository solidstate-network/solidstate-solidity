// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { ReentrancyGuard } from '../security/reentrancy_guard/ReentrancyGuard.sol';

abstract contract ReentrancyGuardTest is ReentrancyGuard {
    function modifier_nonReentrant() external nonReentrant {
        // do nothing
    }

    function reentrancyTest() external nonReentrant {
        this.reentrancyTest();
    }

    function crossFunctionReentrancyTest() external nonReentrant {
        this.reentrancyTest();
    }
}
