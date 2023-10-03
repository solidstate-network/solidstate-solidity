// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { Math } from '../../../utils/Math.sol';
import { SafeCast } from '../../../utils/SafeCast.sol';
import { AccessControlInternal } from '../../access_control/AccessControlInternal.sol';
import { IAccessControlDefaultAdminRulesInternal } from './IAccessControlDefaultAdminRulesInternal.sol';
import { AccessControlDefaultAdminRulesStorage } from './AccessControlDefaultAdminRulesStorage.sol';

/**
 * @title Role-based access control system with default admin rules
 * @dev derived from https://github.com/OpenZeppelin/openzeppelin-contracts (MIT license)
 */
abstract contract AccessControlDefaultAdminRulesInternal is
    IAccessControlDefaultAdminRulesInternal,
    AccessControlInternal
{
    /**
     * @notice query default admin
     * @return defaultAdmin the default admin
     */
    function _defaultAdmin() internal view returns (address) {
        return
            AccessControlDefaultAdminRulesStorage.layout()._currentDefaultAdmin;
    }

    /**
     * @notice query pending default admin
     * @return newAdmin pending default admin
     * @return acceptSchedule acceptance schedule
     */
    function _pendingDefaultAdmin()
        internal
        view
        returns (address newAdmin, uint48 acceptSchedule)
    {
        return (
            AccessControlDefaultAdminRulesStorage.layout()._pendingDefaultAdmin,
            AccessControlDefaultAdminRulesStorage
                .layout()
                ._pendingDefaultAdminSchedule
        );
    }

    /**
     * @notice query default admin delay
     * @return defaultAdminDelay default admin delay
     */
    function _defaultAdminDelay() internal view returns (uint48) {
        uint48 schedule = AccessControlDefaultAdminRulesStorage
            .layout()
            ._pendingDelaySchedule;
        return
            (_isScheduleSet(schedule) && _hasSchedulePassed(schedule))
                ? AccessControlDefaultAdminRulesStorage.layout()._pendingDelay
                : AccessControlDefaultAdminRulesStorage.layout()._currentDelay;
    }

    /**
     * @notice query pending default admin delay
     * @return newDelay default admin delay
     * @return effectSchedule effect schedule
     */
    function _pendingDefaultAdminDelay()
        internal
        view
        returns (uint48 newDelay, uint48 effectSchedule)
    {
        effectSchedule = AccessControlDefaultAdminRulesStorage
            .layout()
            ._pendingDelaySchedule;
        return
            (_isScheduleSet(effectSchedule) &&
                !_hasSchedulePassed(effectSchedule))
                ? (
                    AccessControlDefaultAdminRulesStorage
                        .layout()
                        ._pendingDelay,
                    effectSchedule
                )
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
        if (role == AccessControlDefaultAdminRulesStorage.DEFAULT_ADMIN_ROLE) {
            if (_defaultAdmin() != address(0)) {
                revert AccessControlEnforcedDefaultAdminRules();
            }
            AccessControlDefaultAdminRulesStorage
                .layout()
                ._currentDefaultAdmin = account;
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
            role == AccessControlDefaultAdminRulesStorage.DEFAULT_ADMIN_ROLE &&
            account == _defaultAdmin()
        ) {
            delete AccessControlDefaultAdminRulesStorage
                .layout()
                ._currentDefaultAdmin;
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
        if (role == AccessControlDefaultAdminRulesStorage.DEFAULT_ADMIN_ROLE) {
            revert AccessControlEnforcedDefaultAdminRules();
        }
        super._setRoleAdmin(role, adminRole);
    }

    /**
     * @notice start a default admin transfer
     * @param newAdmin new admin
     */
    function _beginDefaultAdminTransfer(address newAdmin) internal virtual {
        uint48 newSchedule = SafeCast.toUint48(block.timestamp) +
            _defaultAdminDelay();
        _setPendingDefaultAdmin(newAdmin, newSchedule);
        emit DefaultAdminTransferScheduled(newAdmin, newSchedule);
    }

    /**
     * @notice cancel a default admin transfer
     */
    function _cancelDefaultAdminTransfer() internal virtual {
        _setPendingDefaultAdmin(address(0), 0);
    }

    /**
     * @notice accept a default admin transfer
     */
    function _acceptDefaultAdminTransfer() internal virtual {
        (address newAdmin, uint48 schedule) = _pendingDefaultAdmin();
        if (msg.sender != newAdmin) {
            revert AccessControlInvalidDefaultAdmin(msg.sender);
        }

        if (!_isScheduleSet(schedule) || !_hasSchedulePassed(schedule)) {
            revert AccessControlEnforcedDefaultAdminDelay(schedule);
        }
        _revokeRole(
            AccessControlDefaultAdminRulesStorage.DEFAULT_ADMIN_ROLE,
            _defaultAdmin()
        );
        _grantRole(
            AccessControlDefaultAdminRulesStorage.DEFAULT_ADMIN_ROLE,
            newAdmin
        );
        delete AccessControlDefaultAdminRulesStorage
            .layout()
            ._pendingDefaultAdmin;
        delete AccessControlDefaultAdminRulesStorage
            .layout()
            ._pendingDefaultAdminSchedule;
    }

    /**
     * @notice change a default admin delay
     * @param newDelay new delay
     */
    function _changeDefaultAdminDelay(uint48 newDelay) internal virtual {
        uint48 newSchedule = SafeCast.toUint48(block.timestamp) +
            _delayChangeWait(newDelay);
        _setPendingDelay(newDelay, newSchedule);
        emit DefaultAdminDelayChangeScheduled(newDelay, newSchedule);
    }

    /**
     * @notice roll back a default admin delay
     */
    function _rollbackDefaultAdminDelay() internal virtual {
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
    ) private {
        (, uint48 oldSchedule) = _pendingDefaultAdmin();

        AccessControlDefaultAdminRulesStorage
            .layout()
            ._pendingDefaultAdmin = newAdmin;
        AccessControlDefaultAdminRulesStorage
            .layout()
            ._pendingDefaultAdminSchedule = newSchedule;

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
    function _setPendingDelay(uint48 newDelay, uint48 newSchedule) private {
        uint48 oldSchedule = AccessControlDefaultAdminRulesStorage
            .layout()
            ._pendingDelaySchedule;

        if (_isScheduleSet(oldSchedule)) {
            if (_hasSchedulePassed(oldSchedule)) {
                // Materialize a virtual delay
                AccessControlDefaultAdminRulesStorage
                    .layout()
                    ._currentDelay = AccessControlDefaultAdminRulesStorage
                    .layout()
                    ._pendingDelay;
            } else {
                // Emit for implicit cancellations when another delay was scheduled.
                emit DefaultAdminDelayChangeCanceled();
            }
        }

        AccessControlDefaultAdminRulesStorage.layout()._pendingDelay = newDelay;
        AccessControlDefaultAdminRulesStorage
            .layout()
            ._pendingDelaySchedule = newSchedule;
    }

    /**
     * @notice query default admin delay wait
     * @return wait wait
     */
    function _defaultAdminDelayIncreaseWait() internal pure returns (uint48) {
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
