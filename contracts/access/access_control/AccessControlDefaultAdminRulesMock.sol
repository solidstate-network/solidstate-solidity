// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { AccessControlDefaultAdminRules } from './AccessControlDefaultAdminRules.sol';
import { AccessControlDefaultAdminRulesStorage } from './AccessControlDefaultAdminRulesStorage.sol';

contract AccessControlDefaultAdminRulesMock is AccessControlDefaultAdminRules {
    constructor() {
        _grantRole(
            AccessControlDefaultAdminRulesStorage.DEFAULT_ADMIN_ROLE,
            msg.sender
        );
    }
}
