// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { EnumerableSet } from '../../data/EnumerableSet.sol';
import { AccessControlStorage } from '../../storage/AccessControlStorage.sol';
import { AddressUtils } from '../../utils/AddressUtils.sol';
import { UintUtils } from '../../utils/UintUtils.sol';
import { _Context } from '../../meta/_Context.sol';
import { _IAccessControl } from './_IAccessControl.sol';

/**
 * @title Role-based access control system
 * @dev derived from https://github.com/OpenZeppelin/openzeppelin-contracts (MIT license)
 */
abstract contract _AccessControl is _IAccessControl, _Context {
    using AddressUtils for address;
    using EnumerableSet for EnumerableSet.AddressSet;
    using UintUtils for uint256;

    modifier onlyRole(bytes32 role) {
        _checkRole(role);
        _;
    }

    /*
     * @notice query whether role is assigned to account
     * @param role role to query
     * @param account account to query
     * @return whether role is assigned to account
     */
    function _hasRole(
        bytes32 role,
        address account
    ) internal view virtual returns (bool) {
        return
            AccessControlStorage
                .layout(AccessControlStorage.DEFAULT_STORAGE_SLOT)
                .roles[role]
                .members
                .contains(account);
    }

    /**
     * @notice revert if sender does not have given role
     * @param role role to query
     */
    function _checkRole(bytes32 role) internal virtual {
        _checkRole(role, _msgSender());
    }

    /**
     * @notice revert if given account does not have given role
     * @param role role to query
     * @param account to query
     */
    function _checkRole(bytes32 role, address account) internal view virtual {
        if (!_hasRole(role, account)) {
            revert AccessControl__Unauthorized(role, account);
        }
    }

    /*
     * @notice query admin role for given role
     * @param role role to query
     * @return admin role
     */
    function _getRoleAdmin(
        bytes32 role
    ) internal view virtual returns (bytes32) {
        return
            AccessControlStorage
                .layout(AccessControlStorage.DEFAULT_STORAGE_SLOT)
                .roles[role]
                .adminRole;
    }

    /**
     * @notice set role as admin role
     * @param role role to set
     * @param adminRole admin role to set
     */
    function _setRoleAdmin(bytes32 role, bytes32 adminRole) internal virtual {
        bytes32 previousAdminRole = _getRoleAdmin(role);
        AccessControlStorage
            .layout(AccessControlStorage.DEFAULT_STORAGE_SLOT)
            .roles[role]
            .adminRole = adminRole;
        emit RoleAdminChanged(role, previousAdminRole, adminRole);
    }

    /*
     * @notice assign role to given account
     * @param role role to assign
     * @param account recipient of role assignment
     */
    function _grantRole(
        bytes32 role,
        address account
    ) internal virtual onlyRole(_getRoleAdmin(role)) {
        _setRole(role, account, true);
    }

    /*
     * @notice unassign role from given account
     * @param role role to unassign
     * @parm account
     */
    function _revokeRole(
        bytes32 role,
        address account
    ) internal virtual onlyRole(_getRoleAdmin(role)) {
        _setRole(role, account, false);
    }

    /**
     * @notice relinquish role
     * @param role role to relinquish
     */
    function _renounceRole(bytes32 role) internal virtual {
        _setRole(role, _msgSender(), false);
    }

    function _setRole(
        bytes32 role,
        address account,
        bool status
    ) internal virtual {
        if (status) {
            AccessControlStorage
                .layout(AccessControlStorage.DEFAULT_STORAGE_SLOT)
                .roles[role]
                .members
                .add(account);
            emit RoleGranted(role, account, _msgSender());
        } else {
            AccessControlStorage
                .layout(AccessControlStorage.DEFAULT_STORAGE_SLOT)
                .roles[role]
                .members
                .remove(account);
            emit RoleRevoked(role, account, _msgSender());
        }
    }

    /**
     * @notice query role for member at given index
     * @param role role to query
     * @param index index to query
     */
    function _getRoleMember(
        bytes32 role,
        uint256 index
    ) internal view virtual returns (address) {
        return
            AccessControlStorage
                .layout(AccessControlStorage.DEFAULT_STORAGE_SLOT)
                .roles[role]
                .members
                .at(index);
    }

    /**
     * @notice query role for member count
     * @param role role to query
     */
    function _getRoleMemberCount(
        bytes32 role
    ) internal view virtual returns (uint256) {
        return
            AccessControlStorage
                .layout(AccessControlStorage.DEFAULT_STORAGE_SLOT)
                .roles[role]
                .members
                .length();
    }
}
