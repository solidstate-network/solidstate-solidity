// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

library PartialPausableStorage {
    struct Layout {
        mapping(address => bool) partialPaused;
    }

    bytes32 internal constant STORAGE_SLOT =
        keccak256('solidstate.contracts.storage.PartialPausable');

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }
}
