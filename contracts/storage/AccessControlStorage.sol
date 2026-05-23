// SPDX-License-Identifier: MIT

pragma solidity ^0.8.35;

import { EnumerableSet } from '../data/EnumerableSet.sol';
import { sslot } from '../data/StorageSlot.sol';

library AccessControlStorage {
    struct RoleData {
        EnumerableSet.AddressSet members;
        bytes32 adminRole;
    }

    /**
     * @custom:storage-location erc7201:solidstate.layout.AccessControl
     */
    struct Layout {
        mapping(bytes32 roleId => RoleData roleData) roles;
    }

    sslot internal constant DEFAULT_STORAGE_SLOT =
        sslot.wrap(erc7201('solidstate.layout.AccessControl'));

    function ref() internal pure returns (Layout storage $) {
        $ = ref(DEFAULT_STORAGE_SLOT);
    }

    function ref(sslot slot) internal pure returns (Layout storage $) {
        assembly {
            $.slot := slot
        }
    }
}
