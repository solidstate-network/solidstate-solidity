// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

library PartiallyPausableStorage {
    struct Layout {
        mapping(bytes32 => bool) partiallyPaused;
    }

    bytes32 internal constant STORAGE_SLOT =
        keccak256('solidstate.contracts.storage.PartiallyPausable');

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }
}
