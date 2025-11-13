// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IOwnable } from '../../ownable/_IOwnable.sol';
import { _IAccessControl } from '../_IAccessControl.sol';

/**
 * @title Partial IAccessControlOwnable interface needed by internal functions
 */
interface _IAccessControlOwnable is _IAccessControl, _IOwnable {
    error AccessControlOwnable__InvalidActionOnDefaultAdminRole();
}
