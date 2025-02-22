// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

library ERC1404BaseStorage {
    struct Layout {
        mapping(uint8 => string) restrictions;
    }

    bytes32 internal constant STORAGE_SLOT =
        keccak256('solidstate.contracts.storage.ERC1404Base');

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }
}
