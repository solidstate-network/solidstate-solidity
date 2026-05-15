// SPDX-License-Identifier: MIT

pragma solidity ^0.8.35;

import { sslot } from '../data/StorageSlot.sol';
import { duration } from '../utils/time/Duration.sol';
import { timelock } from '../utils/time/Timelock.sol';

library ERC173Storage {
    /**
     * @custom:storage-location erc7201:solidstate.layout.ERC173
     */
    struct Layout {
        address owner;
        address nomineeOwner;
        timelock transferTimelock;
        duration transferTimelockDuration;
    }

    sslot internal constant DEFAULT_STORAGE_SLOT =
        sslot.wrap(erc7201('solidstate.layout.ERC173'));

    function layout() internal pure returns (Layout storage $) {
        $ = layout(DEFAULT_STORAGE_SLOT);
    }

    function layout(sslot slot) internal pure returns (Layout storage $) {
        assembly {
            $.slot := slot
        }
    }
}
