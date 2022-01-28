// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { UpgradeableProxy } from './UpgradeableProxy.sol';

contract UpgradeableProxyMock is UpgradeableProxy {
    constructor(address implementation) {
        _setImplementation(implementation);
    }
}
