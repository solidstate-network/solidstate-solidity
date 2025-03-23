// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ReentrancyGuardStorage } from '../../storage/ReentrancyGuardStorage.sol';
import { _ReentrancyGuard } from './_ReentrancyGuard.sol';
import { _ITransientReentrancyGuard } from './_ITransientReentrancyGuard.sol';

abstract contract _TransientReentrancyGuard is
    _ITransientReentrancyGuard,
    _ReentrancyGuard
{
    /**
     * @notice returns true if the reentrancy guard is locked, false otherwise
     * @return status whether guard is locked
     */
    function _isReentrancyGuardLocked()
        internal
        view
        virtual
        override
        returns (bool status)
    {
        bytes32 slot = ReentrancyGuardStorage.DEFAULT_STORAGE_SLOT;

        assembly {
            status := tload(slot)
        }
    }

    /**
     * @notice lock functions that use the nonReentrant modifier
     */
    function _lockReentrancyGuard() internal virtual override {
        bytes32 slot = ReentrancyGuardStorage.DEFAULT_STORAGE_SLOT;

        assembly {
            tstore(slot, true)
        }
    }

    /**
     * @notice unlock functions that use the nonReentrant modifier
     */
    function _unlockReentrancyGuard() internal virtual override {
        bytes32 slot = ReentrancyGuardStorage.DEFAULT_STORAGE_SLOT;

        assembly {
            tstore(slot, false)
        }
    }
}
