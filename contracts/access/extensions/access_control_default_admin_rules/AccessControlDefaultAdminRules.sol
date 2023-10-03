// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { AccessControl } from '../../access_control/AccessControl.sol';
import { AccessControlInternal } from '../../access_control/AccessControlInternal.sol';
import { IAccessControlDefaultAdminRules } from './IAccessControlDefaultAdminRules.sol';
import { AccessControlDefaultAdminRulesInternal } from './AccessControlDefaultAdminRulesInternal.sol';
import { AccessControlDefaultAdminRulesStorage } from './AccessControlDefaultAdminRulesStorage.sol';

/**
 * @title Role-based access control system with default admin rules
 * @dev derived from https://github.com/OpenZeppelin/openzeppelin-contracts (MIT license)
 */
abstract contract AccessControlDefaultAdminRules is
    IAccessControlDefaultAdminRules,
    AccessControl,
    AccessControlDefaultAdminRulesInternal
{
    /**
     * @inheritdoc IAccessControlDefaultAdminRules
     */
    function defaultAdmin() public view virtual returns (address) {
        return _defaultAdmin();
    }

    /**
     * @inheritdoc IAccessControlDefaultAdminRules
     */
    function pendingDefaultAdmin()
        public
        view
        virtual
        returns (address newAdmin, uint48 acceptSchedule)
    {
        return _pendingDefaultAdmin();
    }

    /**
     * @inheritdoc IAccessControlDefaultAdminRules
     */
    function defaultAdminDelay() public view virtual returns (uint48) {
        return _defaultAdminDelay();
    }

    /**
     * @inheritdoc IAccessControlDefaultAdminRules
     */
    function pendingDefaultAdminDelay()
        public
        view
        virtual
        returns (uint48 newDelay, uint48 effectSchedule)
    {
        return _pendingDefaultAdminDelay();
    }

    /**
     * @inheritdoc IAccessControlDefaultAdminRules
     */
    function beginDefaultAdminTransfer(
        address newAdmin
    )
        public
        virtual
        onlyRole(AccessControlDefaultAdminRulesStorage.DEFAULT_ADMIN_ROLE)
    {
        _beginDefaultAdminTransfer(newAdmin);
    }

    /**
     * @inheritdoc IAccessControlDefaultAdminRules
     */
    function cancelDefaultAdminTransfer()
        public
        virtual
        onlyRole(AccessControlDefaultAdminRulesStorage.DEFAULT_ADMIN_ROLE)
    {
        _cancelDefaultAdminTransfer();
    }

    /**
     * @inheritdoc IAccessControlDefaultAdminRules
     */
    function acceptDefaultAdminTransfer() public virtual {
        _acceptDefaultAdminTransfer();
    }

    /**
     * @inheritdoc IAccessControlDefaultAdminRules
     */
    function changeDefaultAdminDelay(
        uint48 newDelay
    )
        public
        virtual
        onlyRole(AccessControlDefaultAdminRulesStorage.DEFAULT_ADMIN_ROLE)
    {
        _changeDefaultAdminDelay(newDelay);
    }

    /**
     * @inheritdoc IAccessControlDefaultAdminRules
     */
    function rollbackDefaultAdminDelay()
        public
        virtual
        onlyRole(AccessControlDefaultAdminRulesStorage.DEFAULT_ADMIN_ROLE)
    {
        _rollbackDefaultAdminDelay();
    }

    /**
     * @inheritdoc IAccessControlDefaultAdminRules
     */
    function defaultAdminDelayIncreaseWait()
        public
        view
        virtual
        returns (uint48)
    {
        return _defaultAdminDelayIncreaseWait();
    }

    function _grantRole(
        bytes32 role,
        address account
    )
        internal
        virtual
        override(AccessControlInternal, AccessControlDefaultAdminRulesInternal)
    {
        super._grantRole(role, account);
    }

    function _revokeRole(
        bytes32 role,
        address account
    )
        internal
        virtual
        override(AccessControlInternal, AccessControlDefaultAdminRulesInternal)
    {
        super._revokeRole(role, account);
    }

    function _setRoleAdmin(
        bytes32 role,
        bytes32 adminRole
    )
        internal
        virtual
        override(AccessControlInternal, AccessControlDefaultAdminRulesInternal)
    {
        super._setRoleAdmin(role, adminRole);
    }
}
