// SPDX-License-Identifier: MIT
// From OpenZeppelin Contracts v4.4.1 (access/IAccessControl.sol)

pragma solidity ^0.8.0;

import { IAccessControlInternal } from './IAccessControlInternal.sol';

/**
 * @title AccessControl interface
 * @dev External interface of AccessControl declared to support ERC165 detection.
 */
interface IAccessControl is IAccessControlInternal {
    /*
     * @inheritdoc IAccessControlInternal _hasRole
     */
    function hasRole(bytes32 role, address account)
        external
        view
        returns (bool);

    /*
     * @inheritdoc IAccessControlInternal _getRoleAdmin
     */
    function getRoleAdmin(bytes32 role) external view returns (bytes32);

    /*
     * @inheritdoc IAccessControlInternal _setRoleAdmin
     */
    function grantRole(bytes32 role, address account) external;

    /*
     * @inheritdoc IAccessControlInternal _revokeRole
     */
    function revokeRole(bytes32 role, address account) external;

    /**
     * @notice remove role from account
     * @param role role to remove
     * @param account account to remove role from
     * @dev Revokes `role` from the calling account.
     *
     * Roles are often managed via {grantRole} and {revokeRole}: this function's
     * purpose is to provide a mechanism for accounts to lose their privileges
     * if they are compromised (such as when a trusted device is misplaced).
     *
     * If the calling account had been granted `role`, emits a {RoleRevoked}
     * event.
     *
     * Requirements:
     *
     * - the caller must be `account`.
     */
    function renounceRole(bytes32 role, address account) external;
}
