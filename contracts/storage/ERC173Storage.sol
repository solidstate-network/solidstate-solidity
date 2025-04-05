// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Slot } from '../data/Slot.sol';

library ERC173Storage {
    /**
     * @custom:storage-location erc7201:solidstate.layout.ERC173
     */
    struct Layout {
        address owner;
        address nomineeOwner;
        uint128 transferTimelock;
        uint128 transferTimelockDuration;
    }

    Slot.StorageSlot internal constant DEFAULT_STORAGE_SLOT =
        Slot.StorageSlot.wrap(
            keccak256(
                abi.encode(
                    uint256(keccak256(bytes('solidstate.layout.ERC173'))) - 1
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
