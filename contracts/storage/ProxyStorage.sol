// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

library ProxyStorage {
    /**
     * @custom:storage-location erc7201:solidstate.contracts.storage.Proxy
     */
    struct Layout {
        address implementation;
        address beacon;
    }

    bytes32 internal constant DEFAULT_STORAGE_SLOT =
        keccak256(
            abi.encode(
                uint256(
                    keccak256(bytes('solidstate.contracts.storage.Proxy'))
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
