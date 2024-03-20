// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

library ERC4626BaseStorage {
    struct Layout {
        address asset;
    }

    bytes32 internal constant STORAGE_SLOT =
        keccak256('solidstate.contracts.storage.ERC4626Base');

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }
}
