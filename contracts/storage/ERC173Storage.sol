// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

library ERC173Storage {
    /**
     * @custom:storage-location erc7201:solidstate.layout.ERC173
     */
    struct Layout {
        address owner;
        address nomineeOwner;
    }

    bytes32 internal constant DEFAULT_STORAGE_SLOT =
        keccak256(
            abi.encode(
                uint256(keccak256(bytes('solidstate.layout.ERC173'))) - 1
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
