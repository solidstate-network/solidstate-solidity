// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _Context } from '../../meta/_Context.sol';
import { PausableStorage } from '../../storage/PausableStorage.sol';
import { _IPartiallyPausable } from './_IPartiallyPausable.sol';

/**
 * @title Internal functions for PartiallyPausable security control module.
 */
abstract contract _PartiallyPausable is _IPartiallyPausable, _Context {
    modifier whenNotPartiallyPaused(bytes32 key) {
        if (_partiallyPaused(key)) revert PartiallyPausable__PartiallyPaused();
        _;
    }

    modifier whenPartiallyPaused(bytes32 key) {
        if (!_partiallyPaused(key))
            revert PartiallyPausable__NotPartiallyPaused();
        _;
    }

    /**
     * @notice query whether contract is paused in the scope of the given key
     * @return status whether contract is paused in the scope of the given key
     */
    function _partiallyPaused(
        bytes32 key
    ) internal view virtual returns (bool status) {
        status = PausableStorage
            .layout(PausableStorage.DEFAULT_STORAGE_SLOT)
            .partiallyPaused[key];
    }

    /**
     * @notice pause contract in the scope of given key
     * @param key key whose scope to pause
     */
    function _partiallyPause(
        bytes32 key
    ) internal virtual whenNotPartiallyPaused(key) {
        PausableStorage
            .layout(PausableStorage.DEFAULT_STORAGE_SLOT)
            .partiallyPaused[key] = true;
        emit PartiallyPaused(_msgSender(), key);
    }

    /**
     * @notice unpause contract in the scope of given key
     * @param key key whose scope to unpause
     */
    function _partiallyUnpause(
        bytes32 key
    ) internal virtual whenPartiallyPaused(key) {
        delete PausableStorage
            .layout(PausableStorage.DEFAULT_STORAGE_SLOT)
            .partiallyPaused[key];
        emit PartiallyUnpaused(_msgSender(), key);
    }
}
