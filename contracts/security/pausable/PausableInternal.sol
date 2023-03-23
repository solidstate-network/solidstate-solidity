// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { IPausableInternal } from './IPausableInternal.sol';
import { PausableStorage } from './PausableStorage.sol';

/**
 * @title Internal functions for Pausable security control module.
 */
abstract contract PausableInternal is IPausableInternal {
    modifier whenNotPaused() {
        if (_paused()) revert Pausable__Paused();
        _;
    }

    modifier whenPaused() {
        if (!_paused()) revert Pausable__NotPaused();
        _;
    }

    modifier whenNotPartiallyPaused(bytes32 key) {
        if (_partiallyPaused(key)) revert Pausable__Paused();
        _;
    }

    modifier whenPartiallyPaused(bytes32 key) {
        if (!_partiallyPaused(key)) revert Pausable__NotPaused();
        _;
    }

    /**
     * @notice query whether contract is paused
     * @return status whether contract is paused
     */
    function _paused() internal view virtual returns (bool status) {
        status = PausableStorage.layout().paused;
    }

    /**
     * @notice query whether contract is paused in the scope of the given key
     * @return status whether contract is paused in the scope of the given key
     */
    function _partiallyPaused(
        bytes32 key
    ) internal view virtual returns (bool status) {
        status = _paused() || PausableStorage.layout().partiallyPaused[key];
    }

    /**
     * @notice Triggers paused state, when contract is unpaused.
     */
    function _pause() internal virtual whenNotPaused {
        PausableStorage.layout().paused = true;
        emit Paused(msg.sender);
    }

    function _partiallyPause(
        bytes32 key
    ) internal virtual whenNotPartiallyPaused(key) {
        PausableStorage.layout().partiallyPaused[key] = true;
        emit PausedWithKey(msg.sender, key);
    }

    /**
     * @notice Triggers unpaused state, when contract is paused.
     */
    function _unpause() internal virtual whenPaused {
        PausableStorage.layout().paused = false;
        emit Unpaused(msg.sender);
    }

    function _partiallyUnpause(
        bytes32 key
    ) internal virtual whenPartiallyPaused(key) {
        PausableStorage.layout().partiallyPaused[key] = false;
        emit UnpausedWithKey(msg.sender, key);
    }
}
