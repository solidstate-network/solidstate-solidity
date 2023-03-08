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

    modifier whenNotPartiallyPaused(uint256 mask) {
        if (_partiallyPaused(mask)) revert Pausable__Paused();
        _;
    }

    modifier whenPartiallyPaused(uint256 mask) {
        if (!_partiallyPaused(mask)) revert Pausable__NotPaused();
        _;
    }

    /**
     * @notice query whether contract is paused
     * @return status whether contract is paused
     */
    function _paused() internal view virtual returns (bool status) {
        status = PausableStorage.layout().paused == 1;
    }

    /**
     * @notice query whether contract is paused in the scope of the given mask
     * @return status whether contract is paused in the scope of the given mask
     */
    function _partiallyPaused(
        uint256 mask
    ) internal view virtual returns (bool status) {
        status = PausableStorage.layout().paused & mask != 0;
    }

    /**
     * @notice Triggers paused state, when contract is unpaused.
     */
    function _pause() internal virtual whenNotPaused {
        PausableStorage.layout().paused = 1;
        emit Paused(msg.sender);
    }

    function _partiallyPause(
        uint256 mask
    ) internal virtual whenNotPartiallyPaused(mask) {
        PausableStorage.layout().paused ^= mask;
        emit Paused(msg.sender);
    }

    /**
     * @notice Triggers unpaused state, when contract is paused.
     */
    function _unpause() internal virtual whenPaused {
        PausableStorage.layout().paused = 0;
        emit Unpaused(msg.sender);
    }

    function _partiallyUnpause(
        uint256 mask
    ) internal virtual whenPartiallyPaused(mask) {
        PausableStorage.layout().paused ^= mask;
        emit Unpaused(msg.sender);
    }
}
