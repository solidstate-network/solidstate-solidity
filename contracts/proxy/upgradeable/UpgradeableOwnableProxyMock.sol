// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { UpgradeableOwnableProxy } from './UpgradeableOwnableProxy.sol';

contract UpgradeableOwnableProxyMock is UpgradeableOwnableProxy {
    constructor(address implementation)
        UpgradeableOwnableProxy(implementation)
    {}
}
