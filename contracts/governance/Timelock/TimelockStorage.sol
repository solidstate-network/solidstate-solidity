// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

library TimelockStorage {
    bytes32 internal constant STORAGE_SLOT =
        keccak256('solidstate.contracts.storage.Timelock');

    struct Layout {
        address admin;
        address pendingAdmin;
        uint256 delay;
        mapping(bytes32 => bool) queuedTransactions;
    }

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }
}
