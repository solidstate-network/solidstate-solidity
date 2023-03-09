// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

library PausableStorage {
    struct Layout {
        bool paused;
        mapping(bytes32 => bool) partiallyPaused;
    }

    bytes32 internal constant STORAGE_SLOT =
        keccak256('solidstate.contracts.storage.Pausable');

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }
}
