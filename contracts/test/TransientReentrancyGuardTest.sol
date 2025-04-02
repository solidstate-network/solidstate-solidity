// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { TransientReentrancyGuard } from '../security/reentrancy_guard/TransientReentrancyGuard.sol';

abstract contract TransientReentrancyGuardTest is TransientReentrancyGuard {
    function modifier_nonReentrant() external nonReentrant {
        // do nothing
    }

    function reentrancyTest() external nonReentrant {
        this.reentrancyTest();
    }

    function crossFunctionReentrancyTest() external nonReentrant {
        this.reentrancyTest();
    }

    function lockReentrancyGuardTest() external {
        _lockReentrancyGuard();
        this.modifier_nonReentrant();
    }

    function unlockReentrancyGuardTest() external nonReentrant {
        _unlockReentrancyGuard();
        this.modifier_nonReentrant();
    }
}
