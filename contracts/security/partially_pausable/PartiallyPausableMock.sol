// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { PartiallyPausable } from './PartiallyPausable.sol';

contract PartiallyPausableMock is PartiallyPausable {
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

    function __partiallyPaused(
        bytes32 key
    ) external view returns (bool status) {
        status = _partiallyPaused(key);
    }

    function __partiallyPause(bytes32 key) external {
        _partiallyPause(key);
    }

    function __partiallyUnpause(bytes32 key) external {
        _partiallyUnpause(key);
    }
}
