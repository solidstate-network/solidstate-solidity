// SPDX-License-Identifier: MIT

pragma solidity ^0.8.35;

import { sslot } from '../data/StorageSlot.sol';

library ERC165Storage {
    /**
     * @custom:storage-location erc7201:solidstate.layout.ERC165
     */
    struct Layout {
        mapping(bytes4 interfaceId => bool supportStatus) supportedInterfaces;
    }

    sslot internal constant DEFAULT_STORAGE_SLOT =
        sslot.wrap(bytes32(erc7201('solidstate.layout.ERC165')));

    function layout() internal pure returns (Layout storage $) {
        $ = layout(DEFAULT_STORAGE_SLOT);
    }

    function layout(sslot slot) internal pure returns (Layout storage $) {
        assembly {
            $.slot := slot
        }
    }
}
