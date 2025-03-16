// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Math } from '../../utils/Math.sol';
import { AccessControlStorage } from '../../storage/AccessControlStorage.sol';
import { SafeCast } from '../../utils/SafeCast.sol';
import { _AccessControl } from './_AccessControl.sol';
import { _IAccessControlDefaultAdminRules } from './_IAccessControlDefaultAdminRules.sol';

/**
 * @title Role-based access control system with default admin rules
 * @dev derived from https://github.com/OpenZeppelin/openzeppelin-contracts (MIT license)
 */
abstract contract _AccessControlDefaultAdminRules is
    _IAccessControlDefaultAdminRules,
    _AccessControl
{
    /**
     * @notice query default admin
     * @return defaultAdmin the default admin
     */
    function _defaultAdmin()
        internal
        view
        virtual
        returns (address defaultAdmin)
    {
        defaultAdmin = AccessControlStorage
            .layout(AccessControlStorage.DEFAULT_STORAGE_SLOT)
            .currentDefaultAdmin;
    }

    /**
     * @notice query pending default admin
     * @return newAdmin pending default admin
     * @return acceptSchedule acceptance schedule
     */
    function _pendingDefaultAdmin()
        internal
        view
        virtual
        returns (address newAdmin, uint48 acceptSchedule)
    {
        AccessControlStorage.Layout storage $ = AccessControlStorage.layout(
            AccessControlStorage.DEFAULT_STORAGE_SLOT
        );

        return ($.pendingDefaultAdmin, $.pendingDefaultAdminSchedule);
    }

    /**
     * @notice query default admin delay
     * @return defaultAdminDelay default admin delay
     */
    function _defaultAdminDelay()
        internal
        view
        virtual
        returns (uint48 defaultAdminDelay)
    {
        AccessControlStorage.Layout storage $ = AccessControlStorage.layout(
            AccessControlStorage.DEFAULT_STORAGE_SLOT
        );

        defaultAdminDelay = (_isScheduleSet($.pendingDelaySchedule) &&
            _hasSchedulePassed($.pendingDelaySchedule))
            ? $.pendingDelay
            : $.currentDelay;
    }

    /**
     * @notice query pending default admin delay
     * @return newDelay default admin delay
     * @return effectSchedule effect schedule
     */
    function _pendingDefaultAdminDelay()
        internal
        view
        virtual
        returns (uint48 newDelay, uint48 effectSchedule)
    {
        AccessControlStorage.Layout storage $ = AccessControlStorage.layout(
            AccessControlStorage.DEFAULT_STORAGE_SLOT
        );
        effectSchedule = $.pendingDelaySchedule;
        return
            (_isScheduleSet(effectSchedule) &&
                !_hasSchedulePassed(effectSchedule))
                ? ($.pendingDelay, effectSchedule)
                : (0, 0);
    }

    /**
     * @notice assign role to given account
     * @param role role to assign
     * @param account recipient of role assignment
     */
    function _grantRole(
        bytes32 role,
        address account
    ) internal virtual override {
        if (role == AccessControlStorage.DEFAULT_ADMIN_ROLE) {
            if (_defaultAdmin() != address(0)) {
                revert AccessControlEnforcedDefaultAdminRules();
            }
            AccessControlStorage
                .layout(AccessControlStorage.DEFAULT_STORAGE_SLOT)
                .currentDefaultAdmin = account;
        }
        super._grantRole(role, account);
    }

    /**
     * @notice unassign role from given account
     * @param role role to unassign
     * @param account account unassigned
     */
    function _revokeRole(
        bytes32 role,
        address account
    ) internal virtual override {
        if (
            role == AccessControlStorage.DEFAULT_ADMIN_ROLE &&
            account == _defaultAdmin()
        ) {
            delete AccessControlStorage
                .layout(AccessControlStorage.DEFAULT_STORAGE_SLOT)
                .currentDefaultAdmin;
        }
        super._revokeRole(role, account);
    }

    /**
     * @notice set role as admin role
     * @param role role to set
     * @param adminRole admin role to set
     */
    function _setRoleAdmin(
        bytes32 role,
        bytes32 adminRole
    ) internal virtual override {
        if (role == AccessControlStorage.DEFAULT_ADMIN_ROLE) {
            revert AccessControlEnforcedDefaultAdminRules();
        }
        super._setRoleAdmin(role, adminRole);
    }

    /**
     * @notice start a default admin transfer
     * @param newAdmin new admin
     */
    function _beginDefaultAdminTransfer(
        address newAdmin
    ) internal virtual onlyRole(AccessControlStorage.DEFAULT_ADMIN_ROLE) {
        uint48 newSchedule = uint48(block.timestamp) + _defaultAdminDelay();
        _setPendingDefaultAdmin(newAdmin, newSchedule);
        emit DefaultAdminTransferScheduled(newAdmin, newSchedule);
    }

    /**
     * @notice cancel a default admin transfer
     */
    function _cancelDefaultAdminTransfer()
        internal
        virtual
        onlyRole(AccessControlStorage.DEFAULT_ADMIN_ROLE)
    {
        _setPendingDefaultAdmin(address(0), 0);
    }

    /**
     * @notice accept a default admin transfer
     */
    function _acceptDefaultAdminTransfer() internal virtual {
        AccessControlStorage.Layout storage $ = AccessControlStorage.layout(
            AccessControlStorage.DEFAULT_STORAGE_SLOT
        );
        (address newAdmin, uint48 schedule) = _pendingDefaultAdmin();
        if (msg.sender != newAdmin) {
            revert AccessControlInvalidDefaultAdmin(msg.sender);
        }

        if (!_isScheduleSet(schedule) || !_hasSchedulePassed(schedule)) {
            revert AccessControlEnforcedDefaultAdminDelay(schedule);
        }
        _revokeRole(AccessControlStorage.DEFAULT_ADMIN_ROLE, _defaultAdmin());
        _grantRole(AccessControlStorage.DEFAULT_ADMIN_ROLE, newAdmin);
        delete $.pendingDefaultAdmin;
        delete $.pendingDefaultAdminSchedule;
    }

    /**
     * @notice change a default admin delay
     * @param newDelay new delay
     */
    function _changeDefaultAdminDelay(
        uint48 newDelay
    ) internal virtual onlyRole(AccessControlStorage.DEFAULT_ADMIN_ROLE) {
        uint48 newSchedule = uint48(block.timestamp) +
            _delayChangeWait(newDelay);
        _setPendingDelay(newDelay, newSchedule);
        emit DefaultAdminDelayChangeScheduled(newDelay, newSchedule);
    }

    /**
     * @notice roll back a default admin delay
     */
    function _rollbackDefaultAdminDelay()
        internal
        virtual
        onlyRole(AccessControlStorage.DEFAULT_ADMIN_ROLE)
    {
        _setPendingDelay(0, 0);
    }

    /**
     * @notice query the wait before new delay becomes default admin delay
     * @param newDelay new delay
     * @return wait wait
     */
    function _delayChangeWait(
        uint48 newDelay
    ) internal view virtual returns (uint48) {
        uint48 currentDelay = _defaultAdminDelay();
        return
            newDelay > currentDelay
                ? uint48(Math.min(newDelay, _defaultAdminDelayIncreaseWait()))
                : currentDelay - newDelay;
    }

    /**
     * @notice set pending default admin
     * @param newAdmin new admin
     * @param newSchedule new schedule
     */
    function _setPendingDefaultAdmin(
        address newAdmin,
        uint48 newSchedule
    ) internal virtual {
        AccessControlStorage.Layout storage $ = AccessControlStorage.layout(
            AccessControlStorage.DEFAULT_STORAGE_SLOT
        );
        (, uint48 oldSchedule) = _pendingDefaultAdmin();

        $.pendingDefaultAdmin = newAdmin;
        $.pendingDefaultAdminSchedule = newSchedule;

        // An `oldSchedule` from `pendingDefaultAdmin()` is only set if it hasn't been accepted.
        if (_isScheduleSet(oldSchedule)) {
            // Emit for implicit cancellations when another default admin was scheduled.
            emit DefaultAdminTransferCanceled();
        }
    }

    /**
     * @notice set pending delay
     * @param newDelay new delay
     * @param newSchedule new schedule
     */
    function _setPendingDelay(
        uint48 newDelay,
        uint48 newSchedule
    ) internal virtual {
        AccessControlStorage.Layout storage $ = AccessControlStorage.layout(
            AccessControlStorage.DEFAULT_STORAGE_SLOT
        );

        if (_isScheduleSet($.pendingDelaySchedule)) {
            if (_hasSchedulePassed($.pendingDelaySchedule)) {
                // Materialize a virtual delay
                $.currentDelay = $.pendingDelay;
            } else {
                // Emit for implicit cancellations when another delay was scheduled.
                emit DefaultAdminDelayChangeCanceled();
            }
        }

        $.pendingDelay = newDelay;
        $.pendingDelaySchedule = newSchedule;
    }

    /**
     * @notice query default admin delay wait
     * @return wait wait
     */
    function _defaultAdminDelayIncreaseWait()
        internal
        pure
        virtual
        returns (uint48)
    {
        return 5 days;
    }

    /**
     * @notice query if schedule is set
     * @return isSet is set
     */
    function _isScheduleSet(uint48 schedule) private pure returns (bool) {
        return schedule != 0;
    }

    /**
     * @notice query if schedule is passed
     * @return isPassed is passed
     */
    function _hasSchedulePassed(uint48 schedule) private view returns (bool) {
        return schedule < block.timestamp;
    }
}
