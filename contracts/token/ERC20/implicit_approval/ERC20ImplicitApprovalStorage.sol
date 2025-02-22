// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

library ERC20ImplicitApprovalStorage {
    struct Layout {
        mapping(address => bool) implicitApprovals;
    }

    bytes32 internal constant STORAGE_SLOT =
        keccak256('solidstate.contracts.storage.ERC20ImplicitApproval');

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }
}
