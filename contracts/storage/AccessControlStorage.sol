// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { EnumerableSet } from '../data/EnumerableSet.sol';
import { sslot } from '../data/Slot.sol';

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

    bytes32 internal constant DEFAULT_ADMIN_ROLE = 0x00;

    sslot internal constant DEFAULT_STORAGE_SLOT =
        sslot.wrap(
            keccak256(
                abi.encode(
                    uint256(
                        keccak256(bytes('solidstate.layout.AccessControl'))
                    ) - 1
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
