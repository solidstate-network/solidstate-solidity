// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Slot } from '../data/Slot.sol';

/**
 * @dev derived from https://github.com/mudgen/diamond-2 (MIT license)
 */
library ERC2535Storage {
    /**
     * @custom:storage-location erc7201:solidstate.contracts.storage.ERC2535
     */
    struct Layout {
        // function selector => (facet address, selector slug position)
        mapping(bytes4 selector => bytes32 selectorInfo) selectorInfo;
        // total number of selectors registered
        uint16 selectorCount;
        // array of 32-byte slugs with 8 selectors each
        mapping(uint256 index => bytes32 selectorSlug) selectorSlugs;
        address fallbackAddress;
    }

    Slot.StorageSlot internal constant DEFAULT_STORAGE_SLOT =
        Slot.StorageSlot.wrap(
            keccak256(
                abi.encode(
                    uint256(
                        keccak256(bytes('solidstate.contracts.storage.ERC2535'))
                    ) - 1
                )
            ) & ~bytes32(uint256(0xff))
        );

    function layout() internal pure returns (Layout storage $) {
        $ = layout(DEFAULT_STORAGE_SLOT);
    }

    function layout(
        Slot.StorageSlot slot
    ) internal pure returns (Layout storage $) {
        assembly {
            $.slot := slot
        }
    }
}
