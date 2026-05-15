// SPDX-License-Identifier: MIT

pragma solidity ^0.8.35;

import { sslot } from '../data/StorageSlot.sol';

library InitializableStorage {
    /**
     * @custom:storage-location erc7201:solidstate.layout.Initializable
     */
    struct Layout {
        uint8 initialized;
    }

    sslot internal constant DEFAULT_STORAGE_SLOT =
        sslot.wrap(bytes32(erc7201('solidstate.layout.Initializable')));

    function layout() internal pure returns (Layout storage $) {
        $ = layout(DEFAULT_STORAGE_SLOT);
    }

    function layout(sslot slot) internal pure returns (Layout storage $) {
        assembly {
            $.slot := slot
        }
    }
}
