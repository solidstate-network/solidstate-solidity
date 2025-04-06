// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { AccessControl } from '../AccessControl.sol';
import { _AccessControl } from '../_AccessControl.sol';
import { IAccessControlOwnable } from './IAccessControlOwnable.sol';
import { _AccessControlOwnable } from './_AccessControlOwnable.sol';

/**
 * @title Role-based access control system with default admin rules
 * @dev derived from https://github.com/OpenZeppelin/openzeppelin-contracts (MIT license)
 */
abstract contract AccessControlOwnable is
    IAccessControlOwnable,
    _AccessControlOwnable,
    AccessControl
{
    /**
     * @inheritdoc IAccessControlOwnable
     */
    function defaultAdmin() external view returns (address) {
        return _defaultAdmin();
    }

    /**
     * @inheritdoc IAccessControlOwnable
     */
    function pendingDefaultAdmin()
        external
        view
        returns (address newAdmin, uint48 acceptSchedule)
    {
        return _pendingDefaultAdmin();
    }

    /**
     * @inheritdoc IAccessControlOwnable
     */
    function defaultAdminDelay() external view returns (uint48) {
        return _defaultAdminDelay();
    }

    /**
     * @inheritdoc IAccessControlOwnable
     */
    function pendingDefaultAdminDelay()
        external
        view
        returns (uint48 newDelay, uint48 effectSchedule)
    {
        return _pendingDefaultAdminDelay();
    }

    /**
     * @inheritdoc IAccessControlOwnable
     */
    function beginDefaultAdminTransfer(address newAdmin) external {
        _beginDefaultAdminTransfer(newAdmin);
    }

    /**
     * @inheritdoc IAccessControlOwnable
     */
    function cancelDefaultAdminTransfer() external {
        _cancelDefaultAdminTransfer();
    }

    /**
     * @inheritdoc IAccessControlOwnable
     */
    function acceptDefaultAdminTransfer() external {
        _acceptDefaultAdminTransfer();
    }

    /**
     * @inheritdoc IAccessControlOwnable
     */
    function changeDefaultAdminDelay(uint48 newDelay) external {
        _changeDefaultAdminDelay(newDelay);
    }

    /**
     * @inheritdoc IAccessControlOwnable
     */
    function rollbackDefaultAdminDelay() external {
        _rollbackDefaultAdminDelay();
    }

    /**
     * @inheritdoc IAccessControlOwnable
     */
    function defaultAdminDelayIncreaseWait() external view returns (uint48) {
        return _defaultAdminDelayIncreaseWait();
    }

    function _grantRole(
        bytes32 role,
        address account
    ) internal override(_AccessControl, _AccessControlOwnable) {
        super._grantRole(role, account);
    }

    function _revokeRole(
        bytes32 role,
        address account
    ) internal override(_AccessControl, _AccessControlOwnable) {
        super._revokeRole(role, account);
    }

    function _setRoleAdmin(
        bytes32 role,
        bytes32 adminRole
    ) internal override(_AccessControl, _AccessControlOwnable) {
        super._setRoleAdmin(role, adminRole);
    }
}
