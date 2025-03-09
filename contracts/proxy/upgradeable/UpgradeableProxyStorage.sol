// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

// TODO: this storage library is now referenced by Proxy, so should be renamed
library UpgradeableProxyStorage {
    struct Layout {
        address implementation;
    }

    bytes32 internal constant STORAGE_SLOT =
        keccak256('solidstate.contracts.storage.UpgradeableProxy');

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }
}
