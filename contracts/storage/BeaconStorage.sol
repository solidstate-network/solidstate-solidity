// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Slot } from '../data/Slot.sol';

library BeaconStorage {
    /**
     * @custom:storage-location erc7201:solidstate.contracts.storage.Beacon
     */
    struct Layout {
        address implementation;
    }

    Slot.StorageSlot internal constant DEFAULT_STORAGE_SLOT =
        Slot.StorageSlot.wrap(
            keccak256(
                abi.encode(
                    uint256(
                        keccak256(bytes('solidstate.contracts.storage.Beacon'))
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
