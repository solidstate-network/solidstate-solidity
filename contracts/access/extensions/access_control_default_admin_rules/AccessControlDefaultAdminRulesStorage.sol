// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

library AccessControlDefaultAdminRulesStorage {
    struct Layout {
        address _pendingDefaultAdmin;
        uint48 _pendingDefaultAdminSchedule;
        uint48 _currentDelay;
        address _currentDefaultAdmin;
        uint48 _pendingDelay;
        uint48 _pendingDelaySchedule;
    }

    bytes32 internal constant DEFAULT_ADMIN_ROLE = 0x00;

    bytes32 internal constant STORAGE_SLOT =
        keccak256(
            'solidstate.contracts.storage.AccessControlDefaultAdminRules'
        );

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }
}
