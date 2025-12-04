// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { _Context } from '../../meta/_Context.sol';
import { PausableStorage } from '../../storage/PausableStorage.sol';
import { _IPausable } from './_IPausable.sol';

/**
 * @title Internal functions for Pausable security control module.
 */
abstract contract _Pausable is _IPausable, _Context {
    modifier whenNotPaused() {
        if (_paused()) revert Pausable__Paused();
        _;
    }

    modifier whenPaused() {
        if (!_paused()) revert Pausable__NotPaused();
        _;
    }

    /**
     * @notice query whether contract is paused
     * @return status whether contract is paused
     */
    function _paused() internal view virtual returns (bool status) {
        status = PausableStorage
            .layout(PausableStorage.DEFAULT_STORAGE_SLOT)
            .paused;
    }

    /**
     * @notice Triggers paused state, when contract is unpaused.
     */
    function _pause() internal virtual whenNotPaused {
        PausableStorage
            .layout(PausableStorage.DEFAULT_STORAGE_SLOT)
            .paused = true;
        emit Paused(_msgSender());
    }

    /**
     * @notice Triggers unpaused state, when contract is paused.
     */
    function _unpause() internal virtual whenPaused {
        delete PausableStorage
            .layout(PausableStorage.DEFAULT_STORAGE_SLOT)
            .paused;
        emit Unpaused(_msgSender());
    }
}
