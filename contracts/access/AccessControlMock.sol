// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './AccessControl.sol';

contract AccessControlMock is AccessControl {
    constructor(address admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
    }

    function setRoleAdmin(bytes32 roleId, bytes32 adminRoleId) public {
        _setRoleAdmin(roleId, adminRoleId);
    }

    function checkRole(bytes32 role) public view onlyRole(role) returns (bool) {
        return _hasRole(role, msg.sender);
    }

    function senderProtected(bytes32 roleId) public onlyRole(roleId) {}
}
