// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { sslot } from '../../data/StorageSlot.sol';
import { tslot } from '../../data/TransientSlot.sol';
import { ReentrancyGuardStorage } from '../../storage/ReentrancyGuardStorage.sol';
import { Bool } from '../../utils/Bool.sol';
import { Bytes32 } from '../../utils/Bytes32.sol';
import { _ReentrancyGuard } from './_ReentrancyGuard.sol';
import { _ITransientReentrancyGuard } from './_ITransientReentrancyGuard.sol';

abstract contract _TransientReentrancyGuard is
    _ITransientReentrancyGuard,
    _ReentrancyGuard
{
    using Bool for bool;
    using Bytes32 for bytes32;

    tslot private constant TRANSIENT_SLOT =
        tslot.wrap(sslot.unwrap(ReentrancyGuardStorage.DEFAULT_STORAGE_SLOT));

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
