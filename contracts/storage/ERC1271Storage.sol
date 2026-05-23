// SPDX-License-Identifier: MIT

pragma solidity ^0.8.35;

import { sslot } from '../data/StorageSlot.sol';

library ERC1271Storage {
    /**
     * @custom:storage-location erc7201:solidstate.layout.ERC1271
     */
    struct Layout {
        mapping(bytes32 hash => bool signedStatus) hashes;
    }

    sslot internal constant DEFAULT_STORAGE_SLOT =
        sslot.wrap(erc7201('solidstate.layout.ERC1271'));

    function ref() internal pure returns (Layout storage $) {
        $ = ref(DEFAULT_STORAGE_SLOT);
    }

    function ref(sslot slot) internal pure returns (Layout storage $) {
        assembly {
            $.slot := slot
        }
    }
}
