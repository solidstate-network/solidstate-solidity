// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

library ERC2981Storage {
    struct Layout {
        // token id -> royalty (denominated in basis points)
        mapping(uint256 => uint16) royaltiesBPS;
        uint16 defaultRoyaltyBPS;
        // token id -> receiver address
        mapping(uint256 => address) royaltyReceivers;
        address defaultRoyaltyReceiver;
    }

    bytes32 internal constant STORAGE_SLOT =
        keccak256('solidstate.contracts.storage.ERC2981');

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }
}
