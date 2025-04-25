// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IContext } from '../../meta/_IContext.sol';

/**
 * @title Partial AccessControl interface needed by internal functions
 */
interface _IAccessControl is _IContext {
    event RoleAdminChanged(
        bytes32 indexed role,
        bytes32 indexed previousAdminRole,
        bytes32 indexed newAdminRole
    );

    event RoleGranted(
        bytes32 indexed role,
        address indexed account,
        address indexed sender
    );

    event RoleRevoked(
        bytes32 indexed role,
        address indexed account,
        address indexed sender
    );

    error AccessControl__Unauthorized(bytes32 role, address account);
}
