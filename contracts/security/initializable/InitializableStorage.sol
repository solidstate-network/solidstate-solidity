// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

library InitializableStorage {
    struct Layout {
        uint8 initialized;
    }

    bytes32 internal constant STORAGE_SLOT =
        keccak256('solidstate.contracts.storage.Initializable');

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }
}
