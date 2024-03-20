// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { UpgradeableProxyOwnable } from './UpgradeableProxyOwnable.sol';

contract UpgradeableProxyOwnableMock is UpgradeableProxyOwnable {
    constructor(address implementation, address owner) {
        _setImplementation(implementation);
        _setOwner(owner);
    }

    /**
     * @dev suppress compiler warning
     */
    receive() external payable {}
}
