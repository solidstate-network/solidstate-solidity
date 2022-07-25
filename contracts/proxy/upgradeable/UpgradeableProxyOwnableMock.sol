// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { OwnableStorage } from '../../access/ownable/OwnableStorage.sol';
import { UpgradeableProxyOwnable } from './UpgradeableProxyOwnable.sol';

contract UpgradeableProxyOwnableMock is UpgradeableProxyOwnable {
    constructor(address implementation, address owner) {
        _setImplementation(implementation);
        OwnableStorage.layout().owner = owner;
    }

    /**
     * @dev suppress compiler warning
     */
    receive() external payable {}
}
