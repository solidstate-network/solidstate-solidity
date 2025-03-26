// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

library ReentrancyGuardStorage {
    /**
     * @custom:storage-location erc7201:solidstate.contracts.storage.ReentrancyGuard
     */
    struct Layout {
        uint256 status;
    }

    bytes32 internal constant DEFAULT_STORAGE_SLOT =
        keccak256(
            abi.encode(
                uint256(
                    keccak256(
                        bytes('solidstate.contracts.storage.ReentrancyGuard')
                    )
                ) - 1
            )
        ) & ~bytes32(uint256(0xff));

    function layout() internal pure returns (Layout storage $) {
        $ = layout(DEFAULT_STORAGE_SLOT);
    }

    function layout(bytes32 slot) internal pure returns (Layout storage $) {
        assembly {
            $.slot := slot
        }
    }
}
