// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

library ERC4626BaseStorage {
    struct Layout {
        address asset;
    }

    bytes32 internal constant DEFAULT_STORAGE_SLOT =
        keccak256('solidstate.contracts.storage.ERC4626Base');

    function layout() internal pure returns (Layout storage l) {
        l = layout(DEFAULT_STORAGE_SLOT);
    }

    function layout(bytes32 slot) internal pure returns (Layout storage l) {
        assembly {
            l.slot := slot
        }
    }
}
