// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Slot } from '../data/Slot.sol';

library InitializableStorage {
    /**
     * @custom:storage-location erc7201:solidstate.contracts.storage.Initializable
     */
    struct Layout {
        uint8 initialized;
    }

    Slot.StorageSlot internal constant DEFAULT_STORAGE_SLOT =
        Slot.StorageSlot.wrap(
            keccak256(
                abi.encode(
                    uint256(
                        keccak256(
                            bytes('solidstate.contracts.storage.Initializable')
                        )
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
