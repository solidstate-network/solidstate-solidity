// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { _Ownable } from '../../ownable/_Ownable.sol';
import { _AccessControl } from '../_AccessControl.sol';
import { _IAccessControlOwnable } from './_IAccessControlOwnable.sol';

/**
 * @title Role-based access control system with default admin rules
 */
abstract contract _AccessControlOwnable is
    _IAccessControlOwnable,
    _AccessControl,
    _Ownable
{
    /**
     * @inheritdoc _AccessControl
     * @dev reverts if DEFAULT_ADMIN_ROLE is manipulated
     */
    function _grantRole(
        bytes32 role,
        address account
    ) internal virtual override {
        if (role == DEFAULT_ADMIN_ROLE)
            revert AccessControlOwnable__InvalidActionOnDefaultAdminRole();
        super._grantRole(role, account);
    }

    /**
     * @inheritdoc _AccessControl
     * @dev reverts if DEFAULT_ADMIN_ROLE is manipulated
     */
    function _revokeRole(
        bytes32 role,
        address account
    ) internal virtual override {
        if (role == DEFAULT_ADMIN_ROLE)
            revert AccessControlOwnable__InvalidActionOnDefaultAdminRole();
        super._revokeRole(role, account);
    }

    /**
     * @inheritdoc _AccessControl
     * @dev reverts if DEFAULT_ADMIN_ROLE is manipulated
     */
    function _setRoleAdmin(
        bytes32 role,
        bytes32 adminRole
    ) internal virtual override {
        if (role == DEFAULT_ADMIN_ROLE)
            revert AccessControlOwnable__InvalidActionOnDefaultAdminRole();
        super._setRoleAdmin(role, adminRole);
    }

    /**
     * @inheritdoc _Ownable
     * @dev AccessControl DEFAULT_ADMIN_ROLE is revoked from previous owner and granted to new owner
     */
    function _setOwner(address account) internal virtual override {
        address previousOwner = _owner();

        super._setOwner(account);

        if (previousOwner != address(0)) {
            _setRole(DEFAULT_ADMIN_ROLE, previousOwner, false);
        }

        _setRole(DEFAULT_ADMIN_ROLE, account, true);
    }
}
