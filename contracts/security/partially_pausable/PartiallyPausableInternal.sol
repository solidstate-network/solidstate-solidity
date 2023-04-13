// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { IPartiallyPausableInternal } from './IPartiallyPausableInternal.sol';
import { PartiallyPausableStorage } from './PartiallyPausableStorage.sol';

/**
 * @title Internal functions for PartiallyPausable security control module.
 */
abstract contract PartiallyPausableInternal is IPartiallyPausableInternal {
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
        status = PartiallyPausableStorage.layout().partiallyPaused[key];
    }

    function _partiallyPause(
        bytes32 key
    ) internal virtual whenNotPartiallyPaused(key) {
        PartiallyPausableStorage.layout().partiallyPaused[key] = true;
        emit PartiallyPaused(msg.sender, key);
    }

    /**
     * @notice TODO
     * TODO: how to know whether this will revert?  `partiallyPaused` function will return `true` if either global or local pause is set
     */
    function _partiallyUnpause(
        bytes32 key
    ) internal virtual whenPartiallyPaused(key) {
        delete PartiallyPausableStorage.layout().partiallyPaused[key];
        emit PartiallyUnpaused(msg.sender, key);
    }
}
