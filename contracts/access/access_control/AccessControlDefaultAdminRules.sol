// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { AccessControl } from './AccessControl.sol';
import { _AccessControl } from './_AccessControl.sol';
import { IAccessControlDefaultAdminRules } from './IAccessControlDefaultAdminRules.sol';
import { _AccessControlDefaultAdminRules } from './_AccessControlDefaultAdminRules.sol';

/**
 * @title Role-based access control system with default admin rules
 * @dev derived from https://github.com/OpenZeppelin/openzeppelin-contracts (MIT license)
 */
abstract contract AccessControlDefaultAdminRules is
    IAccessControlDefaultAdminRules,
    _AccessControlDefaultAdminRules,
    AccessControl
{
    /**
     * @inheritdoc IAccessControlDefaultAdminRules
     */
    function defaultAdmin() external view returns (address) {
        return _defaultAdmin();
    }

    /**
     * @inheritdoc IAccessControlDefaultAdminRules
     */
    function pendingDefaultAdmin()
        external
        view
        returns (address newAdmin, uint48 acceptSchedule)
    {
        return _pendingDefaultAdmin();
    }

    /**
     * @inheritdoc IAccessControlDefaultAdminRules
     */
    function defaultAdminDelay() external view returns (uint48) {
        return _defaultAdminDelay();
    }

    /**
     * @inheritdoc IAccessControlDefaultAdminRules
     */
    function pendingDefaultAdminDelay()
        external
        view
        returns (uint48 newDelay, uint48 effectSchedule)
    {
        return _pendingDefaultAdminDelay();
    }

    /**
     * @inheritdoc IAccessControlDefaultAdminRules
     */
    function beginDefaultAdminTransfer(address newAdmin) external {
        _beginDefaultAdminTransfer(newAdmin);
    }

    /**
     * @inheritdoc IAccessControlDefaultAdminRules
     */
    function cancelDefaultAdminTransfer() external {
        _cancelDefaultAdminTransfer();
    }

    /**
     * @inheritdoc IAccessControlDefaultAdminRules
     */
    function acceptDefaultAdminTransfer() external {
        _acceptDefaultAdminTransfer();
    }

    /**
     * @inheritdoc IAccessControlDefaultAdminRules
     */
    function changeDefaultAdminDelay(uint48 newDelay) external {
        _changeDefaultAdminDelay(newDelay);
    }

    /**
     * @inheritdoc IAccessControlDefaultAdminRules
     */
    function rollbackDefaultAdminDelay() external {
        _rollbackDefaultAdminDelay();
    }

    /**
     * @inheritdoc IAccessControlDefaultAdminRules
     */
    function defaultAdminDelayIncreaseWait() external view returns (uint48) {
        return _defaultAdminDelayIncreaseWait();
    }

    function _grantRole(
        bytes32 role,
        address account
    ) internal override(_AccessControl, _AccessControlDefaultAdminRules) {
        super._grantRole(role, account);
    }

    function _revokeRole(
        bytes32 role,
        address account
    ) internal override(_AccessControl, _AccessControlDefaultAdminRules) {
        super._revokeRole(role, account);
    }

    function _setRoleAdmin(
        bytes32 role,
        bytes32 adminRole
    ) internal override(_AccessControl, _AccessControlDefaultAdminRules) {
        super._setRoleAdmin(role, adminRole);
    }
}
