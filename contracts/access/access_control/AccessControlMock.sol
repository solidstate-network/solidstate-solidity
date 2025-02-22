// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { AccessControl } from './AccessControl.sol';
import { AccessControlStorage } from './AccessControlStorage.sol';

contract AccessControlMock is AccessControl {
    constructor(address admin) {
        _grantRole(AccessControlStorage.DEFAULT_ADMIN_ROLE, admin);
    }

    function setRoleAdmin(bytes32 role, bytes32 adminRole) public {
        _setRoleAdmin(role, adminRole);
    }

    function checkRole(bytes32 role) public view {
        _checkRole(role);
    }

    function checkRole(bytes32 role, address account) public view {
        _checkRole(role, account);
    }
}
