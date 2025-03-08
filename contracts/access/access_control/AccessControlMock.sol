// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { AccessControl } from './AccessControl.sol';
import { AccessControlStorage } from './AccessControlStorage.sol';

contract AccessControlMock is AccessControl {
    constructor(address admin) {
        _setRole(AccessControlStorage.DEFAULT_ADMIN_ROLE, admin, true);
    }

    function setRoleAdmin(bytes32 role, bytes32 adminRole) external {
        _setRoleAdmin(role, adminRole);
    }

    function checkRole(bytes32 role) external view {
        _checkRole(role);
    }

    function checkRole(bytes32 role, address account) external view {
        _checkRole(role, account);
    }
}
