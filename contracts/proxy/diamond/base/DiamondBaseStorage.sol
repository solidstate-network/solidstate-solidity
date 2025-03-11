// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

/**
 * @dev derived from https://github.com/mudgen/diamond-2 (MIT license)
 */
library DiamondBaseStorage {
    /**
     * @custom:storage-location erc7201:solidstate.contracts.storage.DiamondBase
     */
    struct Layout {
        // function selector => (facet address, selector slug position)
        mapping(bytes4 => bytes32) selectorInfo;
        // total number of selectors registered
        uint16 selectorCount;
        // array of 32-byte slugs with 8 selectors each
        mapping(uint256 => bytes32) selectorSlugs;
        address fallbackAddress;
    }

    bytes32 internal constant DEFAULT_STORAGE_SLOT =
        keccak256(
            abi.encode(
                uint256(
                    keccak256(bytes('solidstate.contracts.storage.DiamondBase'))
                ) - 1
            )
        ) & ~bytes32(uint256(0xff));

    function layout() internal pure returns (Layout storage l) {
        l = layout(DEFAULT_STORAGE_SLOT);
    }

    function layout(bytes32 slot) internal pure returns (Layout storage l) {
        assembly {
            l.slot := slot
        }
    }
}
