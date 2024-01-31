// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

library ERC20SnapshotStorage {
    struct Snapshots {
        uint256[] ids;
        uint256[] values;
    }

    struct Layout {
        mapping(address => Snapshots) accountBalanceSnapshots;
        Snapshots totalSupplySnapshots;
        uint256 snapshotId;
    }

    bytes32 internal constant DEFAULT_STORAGE_SLOT =
        keccak256('solidstate.contracts.storage.ERC20Snapshot');

    function layout() internal pure returns (Layout storage l) {
        l = layout(DEFAULT_STORAGE_SLOT);
    }

    function layout(bytes32 slot) internal pure returns (Layout storage l) {
        assembly {
            l.slot := slot
        }
    }
}
