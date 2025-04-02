// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { ReentrancyGuardStorage } from '../../storage/ReentrancyGuardStorage.sol';
import { _IReentrancyGuard } from './_IReentrancyGuard.sol';

abstract contract _ReentrancyGuard is _IReentrancyGuard {
    uint256 internal constant REENTRANCY_STATUS_LOCKED = 2;
    uint256 internal constant REENTRANCY_STATUS_UNLOCKED = 1;

    modifier nonReentrant() virtual {
        if (_isReentrancyGuardLocked()) revert ReentrancyGuard__ReentrantCall();
        _lockReentrancyGuard();
        _;
        _unlockReentrancyGuard();
    }

    /**
     * @notice returns true if the reentrancy guard is locked, false otherwise
     */
    function _isReentrancyGuardLocked() internal view virtual returns (bool) {
        return
            ReentrancyGuardStorage
                .layout(ReentrancyGuardStorage.DEFAULT_STORAGE_SLOT)
                .status == REENTRANCY_STATUS_LOCKED;
    }

    /**
     * @notice lock functions that use the nonReentrant modifier
     */
    function _lockReentrancyGuard() internal virtual {
        ReentrancyGuardStorage
            .layout(ReentrancyGuardStorage.DEFAULT_STORAGE_SLOT)
            .status = REENTRANCY_STATUS_LOCKED;
    }

    /**
     * @notice unlock functions that use the nonReentrant modifier
     */
    function _unlockReentrancyGuard() internal virtual {
        ReentrancyGuardStorage
            .layout(ReentrancyGuardStorage.DEFAULT_STORAGE_SLOT)
            .status = REENTRANCY_STATUS_UNLOCKED;
    }
}
