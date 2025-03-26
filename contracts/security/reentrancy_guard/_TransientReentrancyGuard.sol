// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ReentrancyGuardStorage } from '../../storage/ReentrancyGuardStorage.sol';
import { Bytes32Utils } from '../../utils/Bytes32Utils.sol';
import { StorageUtils } from '../../utils/StorageUtils.sol';
import { _ReentrancyGuard } from './_ReentrancyGuard.sol';
import { _ITransientReentrancyGuard } from './_ITransientReentrancyGuard.sol';

abstract contract _TransientReentrancyGuard is
    _ITransientReentrancyGuard,
    _ReentrancyGuard
{
    using Bytes32Utils for bytes32;
    using StorageUtils for bytes32;

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
        status = ReentrancyGuardStorage
            .DEFAULT_STORAGE_SLOT
            .readTransient()
            .toBool();
    }

    /**
     * @notice lock functions that use the nonReentrant modifier
     */
    function _lockReentrancyGuard() internal virtual override {
        ReentrancyGuardStorage.DEFAULT_STORAGE_SLOT.writeTransient(true);
    }

    /**
     * @notice unlock functions that use the nonReentrant modifier
     */
    function _unlockReentrancyGuard() internal virtual override {
        ReentrancyGuardStorage.DEFAULT_STORAGE_SLOT.writeTransient(false);
    }
}
