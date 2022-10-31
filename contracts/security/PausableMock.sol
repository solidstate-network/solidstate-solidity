// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { Pausable } from './Pausable.sol';

contract PausableMock is Pausable {
    function __pause() external {
        _pause();
    }

    function __unpause() external {
        _unpause();
    }

    function __partialPause(uint8 mask) external {
        _partialPause(mask);
    }

    function __partialUnpause(uint8 mask) external {
        _partialUnpause(mask);
    }
}
