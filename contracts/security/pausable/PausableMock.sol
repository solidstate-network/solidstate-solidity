// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Pausable } from './Pausable.sol';

contract PausableMock is Pausable {
    function modifier_whenNotPaused() external whenNotPaused {
        // do nothing
    }

    function modifier_whenPaused() external whenPaused {
        // do nothing
    }

    function __paused() external view returns (bool status) {
        status = _paused();
    }

    function __pause() external {
        _pause();
    }

    function __unpause() external {
        _unpause();
    }
}
