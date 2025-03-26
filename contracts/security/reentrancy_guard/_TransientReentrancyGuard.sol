// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ReentrancyGuardStorage } from '../../storage/ReentrancyGuardStorage.sol';
import { BoolUtils } from '../../utils/BoolUtils.sol';
import { Bytes32Utils } from '../../utils/Bytes32Utils.sol';
import { StorageUtils } from '../../utils/StorageUtils.sol';
import { _ReentrancyGuard } from './_ReentrancyGuard.sol';
import { _ITransientReentrancyGuard } from './_ITransientReentrancyGuard.sol';

abstract contract _TransientReentrancyGuard is
    _ITransientReentrancyGuard,
    _ReentrancyGuard
{
    using BoolUtils for bool;
    using Bytes32Utils for bytes32;
    using StorageUtils for StorageUtils.TransientSlot;

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
        status = StorageUtils
            .TransientSlot
            .wrap(ReentrancyGuardStorage.DEFAULT_STORAGE_SLOT)
            .read()
            .toBool();
    }

    /**
     * @notice lock functions that use the nonReentrant modifier
     */
    function _lockReentrancyGuard() internal virtual override {
        StorageUtils
            .TransientSlot
            .wrap(ReentrancyGuardStorage.DEFAULT_STORAGE_SLOT)
            .write(true.toBytes32());
    }

    /**
     * @notice unlock functions that use the nonReentrant modifier
     */
    function _unlockReentrancyGuard() internal virtual override {
        StorageUtils
            .TransientSlot
            .wrap(ReentrancyGuardStorage.DEFAULT_STORAGE_SLOT)
            .write(false.toBytes32());
    }
}
