// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { AccessControlDefaultAdminRules } from './AccessControlDefaultAdminRules.sol';
import { AccessControlStorage } from '../../storage/AccessControlStorage.sol';

contract AccessControlDefaultAdminRulesMock is AccessControlDefaultAdminRules {
    constructor() {
        _grantRole(AccessControlStorage.DEFAULT_ADMIN_ROLE, msg.sender);
    }
}
