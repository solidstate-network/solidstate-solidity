// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { sslot } from '../data/StorageSlot.sol';

library BeaconStorage {
    /**
     * @custom:storage-location erc7201:solidstate.layout.Beacon
     */
    struct Layout {
        address implementation;
    }

    sslot internal constant DEFAULT_STORAGE_SLOT =
        sslot.wrap(
            keccak256(
                abi.encode(
                    uint256(keccak256(bytes('solidstate.layout.Beacon'))) - 1
                )
            ) & ~bytes32(uint256(0xff))
        );

    function layout() internal pure returns (Layout storage $) {
        $ = layout(DEFAULT_STORAGE_SLOT);
    }

    function layout(sslot slot) internal pure returns (Layout storage $) {
        assembly {
            $.slot := slot
        }
    }
}
