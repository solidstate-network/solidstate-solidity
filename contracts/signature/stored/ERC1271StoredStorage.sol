// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

library ERC1271StoredStorage {
    struct Layout {
        mapping(bytes32 => bool) hashes;
    }

    bytes32 internal constant STORAGE_SLOT =
        keccak256('solidstate.contracts.storage.ERC1271Stored');

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }
}
