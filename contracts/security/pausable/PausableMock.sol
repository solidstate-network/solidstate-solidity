// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { Pausable } from './Pausable.sol';

contract PausableMock is Pausable {
    function modifier_whenNotPaused() external whenNotPaused {
        // do nothing
    }

    function modifier_whenPaused() external whenPaused {
        // do nothing
    }

    function modifier_whenNotPartiallyPaused(
        bytes32 key
    ) external whenNotPartiallyPaused(key) {
        // do nothing
    }

    function modifier_whenPartiallyPaused(
        bytes32 key
    ) external whenPartiallyPaused(key) {
        // do nothing
    }

    function __paused() external view returns (bool status) {
        status = _paused();
    }

    function __partiallyPaused(
        bytes32 key
    ) external view returns (bool status, bool partialStatus) {
        (status, partialStatus) = _partiallyPaused(key);
    }

    function __pause() external {
        _pause();
    }

    function __partiallyPause(bytes32 key) external {
        _partiallyPause(key);
    }

    function __unpause() external {
        _unpause();
    }

    function __partiallyUnpause(bytes32 key) external {
        _partiallyUnpause(key);
    }
}
