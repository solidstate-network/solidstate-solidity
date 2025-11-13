// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _Ownable } from '../../ownable/_Ownable.sol';
import { Ownable } from '../../ownable/Ownable.sol';
import { _AccessControl } from '../_AccessControl.sol';
import { AccessControl } from '../AccessControl.sol';
import { _AccessControlOwnable } from './_AccessControlOwnable.sol';
import { IAccessControlOwnable } from './IAccessControlOwnable.sol';

/**
 * @title Role-based access control system with default admin rules
 */
abstract contract AccessControlOwnable is
    IAccessControlOwnable,
    _AccessControlOwnable,
    AccessControl,
    Ownable
{
    function _grantRole(
        bytes32 role,
        address account
    ) internal virtual override(_AccessControl, _AccessControlOwnable) {
        super._grantRole(role, account);
    }

    function _revokeRole(
        bytes32 role,
        address account
    ) internal virtual override(_AccessControl, _AccessControlOwnable) {
        super._revokeRole(role, account);
    }

    function _setRoleAdmin(
        bytes32 role,
        bytes32 adminRole
    ) internal virtual override(_AccessControl, _AccessControlOwnable) {
        super._setRoleAdmin(role, adminRole);
    }

    function _setOwner(
        address account
    ) internal virtual override(_Ownable, _AccessControlOwnable) {
        super._setOwner(account);
    }
}
