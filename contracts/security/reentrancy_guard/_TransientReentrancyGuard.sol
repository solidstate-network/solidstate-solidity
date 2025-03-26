// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Slot } from '../../data/Slot.sol';
import { ReentrancyGuardStorage } from '../../storage/ReentrancyGuardStorage.sol';
import { BoolUtils } from '../../utils/BoolUtils.sol';
import { Bytes32Utils } from '../../utils/Bytes32Utils.sol';
import { _ReentrancyGuard } from './_ReentrancyGuard.sol';
import { _ITransientReentrancyGuard } from './_ITransientReentrancyGuard.sol';

abstract contract _TransientReentrancyGuard is
    _ITransientReentrancyGuard,
    _ReentrancyGuard
{
    using BoolUtils for bool;
    using Bytes32Utils for bytes32;
    using Slot for Slot.TransientSlot;

    Slot.TransientSlot private constant TRANSIENT_SLOT =
        Slot.TransientSlot.wrap(
            Slot.StorageSlot.unwrap(ReentrancyGuardStorage.DEFAULT_STORAGE_SLOT)
        );

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
        status = TRANSIENT_SLOT.read().toBool();
    }

    /**
     * @notice lock functions that use the nonReentrant modifier
     */
    function _lockReentrancyGuard() internal virtual override {
        TRANSIENT_SLOT.write(true.toBytes32());
    }

    /**
     * @notice unlock functions that use the nonReentrant modifier
     */
    function _unlockReentrancyGuard() internal virtual override {
        TRANSIENT_SLOT.write(false.toBytes32());
    }
}
