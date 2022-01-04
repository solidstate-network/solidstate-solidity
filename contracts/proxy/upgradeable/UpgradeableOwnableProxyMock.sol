// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { UpgradeableOwnableProxy } from './UpgradeableOwnableProxy.sol';
import { OwnableStorage } from '../../access/OwnableStorage.sol';

contract UpgradeableOwnableProxyMock is UpgradeableOwnableProxy {
    using OwnableStorage for OwnableStorage.Layout;

    constructor(address implementation)
        UpgradeableOwnableProxy(implementation)
    {}

    function getImplementation() external view returns (address) {
        return _getImplementation();
    }

    function getOwner() external view returns (address) {
        return OwnableStorage.layout().owner;
    }

    function setOwner(address owner) public {
        OwnableStorage.layout().setOwner(owner);
    }
}
