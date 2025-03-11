// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

library ERC20PermitStorage {
    struct Layout {
        mapping(address => uint256) nonces;
    }

    bytes32 internal constant STORAGE_SLOT =
        keccak256('solidstate.contracts.storage.ERC20Permit');

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }
}
