// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IAccessControl } from './_IAccessControl.sol';

/**
 * @title Partial IAccessControlOwnable interface needed by internal functions
 */
interface _IAccessControlOwnable is _IAccessControl {
    error AccessControlInvalidDefaultAdmin(address defaultAdmin);

    error AccessControlEnforcedOwnable();

    error AccessControlEnforcedDefaultAdminDelay(uint48 schedule);

    event DefaultAdminTransferScheduled(
        address indexed newAdmin,
        uint48 acceptSchedule
    );

    event DefaultAdminTransferCanceled();

    event DefaultAdminDelayChangeScheduled(
        uint48 newDelay,
        uint48 effectSchedule
    );

    event DefaultAdminDelayChangeCanceled();
}
