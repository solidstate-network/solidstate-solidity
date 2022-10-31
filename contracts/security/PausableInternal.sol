// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { PausableStorage } from './PausableStorage.sol';

/**
 * @title Internal functions for Pausable security control module.
 */
abstract contract PausableInternal {
    using PausableStorage for PausableStorage.Layout;

    error Pausable__Paused();
    error Pausable__NotPaused();

    event Paused(address account);
    event Unpaused(address account);

    event PartiallyPaused(address account, uint8 mask);
    event PartiallyUnpaused(address account, uint8 mask);

    modifier whenNotPaused() {
        if (_paused()) revert Pausable__Paused();
        _;
    }

    modifier whenPaused() {
        if (!_paused()) revert Pausable__NotPaused();
        _;
    }

    modifier whenNotPartiallyPaused(uint8 mask) {
        if (_partiallyPaused(mask)) revert Pausable__Paused();
        _;
    }

    modifier whenPartiallyPaused(uint8 mask) {
        if (!_partiallyPaused(mask)) revert Pausable__NotPaused();
        _;
    }

    /**
     * @notice query the contracts paused state.
     * @return true if paused, false if unpaused.
     */
    function _paused() internal view virtual returns (bool) {
        return PausableStorage.layout().paused;
    }

    /**
     * @notice Triggers paused state, when contract is unpaused.
     */
    function _pause() internal virtual whenNotPaused {
        PausableStorage.layout().paused = true;
        emit Paused(msg.sender);
    }

    /**
     * @notice Triggers unpaused state, when contract is paused.
     */
    function _unpause() internal virtual whenPaused {
        PausableStorage.layout().paused = false;
        emit Unpaused(msg.sender);
    }

    /**
     * @notice query the contracts partialPaused state.
     * param mask of the facet.
     * @return true if paused, false if unpaused.
     */
    function _partiallyPaused(uint8 mask) internal view virtual returns (bool) {
        return PausableStorage.layout().partialPaused[mask];
    }

    /**
     * @notice Triggers partial paused state, when contract is partial unpaused.
     * param mask of the facet to be paused.
     */
    function _partialPause(uint8 mask)
        internal
        virtual
        whenNotPartiallyPaused(mask)
    {
        PausableStorage.layout().partialPaused[mask] = true;
        emit PartiallyPaused(msg.sender, mask);
    }

    /**
     * @notice Triggers partial unpaused state, when contract is partialPaused.
     * param mask of the facet to be unpaused.
     */
    function _partialUnpause(uint8 mask)
        internal
        virtual
        whenPartiallyPaused(mask)
    {
        PausableStorage.layout().partialPaused[mask] = false;
        emit PartiallyUnpaused(msg.sender, mask);
    }
}
