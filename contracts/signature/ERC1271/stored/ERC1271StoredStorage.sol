// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

library ERC1271StoredStorage {
    /**
     * @custom:storage-location erc7201:solidstate.contracts.storage.ERC1271Stored
     */
    struct Layout {
        mapping(bytes32 => bool) hashes;
    }

    bytes32 internal constant DEFAULT_STORAGE_SLOT =
        keccak256(
            abi.encode(
                uint256(
                    keccak256(
                        bytes('solidstate.contracts.storage.ERC1271Stored')
                    )
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
