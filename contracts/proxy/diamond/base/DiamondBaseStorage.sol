// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

/**
 * @dev derived from https://github.com/mudgen/diamond-2 (MIT license)
 */
library DiamondBaseStorage {
    struct Layout {
        // function selector => (facet address, selector slug position)
        mapping(bytes4 => bytes32) selectorInfo;
        // total number of selectors registered
        uint16 selectorCount;
        // array of 32-byte slugs with 8 selectors each
        mapping(uint256 => bytes32) selectorSlugs;
        address fallbackAddress;
    }

    bytes32 internal constant STORAGE_SLOT =
        keccak256('solidstate.contracts.storage.DiamondBase');

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }
}
