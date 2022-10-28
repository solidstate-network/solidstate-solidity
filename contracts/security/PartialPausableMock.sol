// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { PartialPausable } from './PartialPausable.sol';

contract PartialPausableMock is PartialPausable {
    function __partialPause(address facet) external {
        _partialPause(facet);
    }

    function __partialUnpause(address facet) external {
        _partialUnpause(facet);
    }
}
