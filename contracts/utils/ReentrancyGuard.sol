// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { ReentrancyGuardStorage } from './ReentrancyGuardStorage.sol';

/**
 * @title Utility contract for preventing reentrancy attacks
 */
abstract contract ReentrancyGuard {
    error ReentrancyGuard__ReentrantCall();

    modifier nonReentrant() {
        if (ReentrancyGuardStorage.layout().status == 2)
            revert ReentrancyGuard__ReentrantCall();
        _lockReentrancyGuard();
        _;
        _unlockReentrancyGuard();
    }

    /**
     * @notice lock functions that use the nonReentrant modifier
     */
    function _lockReentrancyGuard() internal virtual {
        ReentrancyGuardStorage.layout().status = 2;
    }

    /**
     * @noticer unlock funtions that use the nonReentrant modifier
     */
    function _unlockReentrancyGuard() internal virtual {
        ReentrancyGuardStorage.layout().status = 1;
    }
}
