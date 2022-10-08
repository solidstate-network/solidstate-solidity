// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

library ERC2981Storage {
    struct Layout {
        // any value between 0 - 10000 should be accepted
        uint16 royalty;
        // 1-indexed to allow 0 to signify default royalty
        // token id -> royalty
        mapping(uint256 => uint16) royalties;
        address receiver;
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
