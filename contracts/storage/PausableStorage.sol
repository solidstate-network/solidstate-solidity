// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Slot } from '../data/Slot.sol';

library PausableStorage {
    /**
     * @custom:storage-location erc7201:solidstate.contracts.storage.Pausable
     */
    struct Layout {
        bool paused;
        mapping(bytes32 key => bool pausedStatus) partiallyPaused;
    }

    Slot.StorageSlot internal constant DEFAULT_STORAGE_SLOT =
        Slot.StorageSlot.wrap(
            keccak256(
                abi.encode(
                    uint256(
                        keccak256(
                            bytes('solidstate.contracts.storage.Pausable')
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
