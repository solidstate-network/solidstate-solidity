// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { Proxy } from '../Proxy.sol';
import { OwnableInternal } from '../../access/OwnableInternal.sol';
import { OwnableStorage } from '../../access/OwnableStorage.sol';
import { UpgradeableOwnableProxyStorage } from './UpgradeableOwnableProxyStorage.sol';

contract UpgradeableOwnableProxy is Proxy, OwnableInternal {
    using UpgradeableOwnableProxyStorage for UpgradeableOwnableProxyStorage.Layout;
    using OwnableStorage for OwnableStorage.Layout;

    constructor(address implementation) {
        OwnableStorage.layout().setOwner(msg.sender);
        UpgradeableOwnableProxyStorage.layout().implementation = implementation;
    }

    receive() external payable {}

    function _getImplementation() internal view override returns (address) {
        return UpgradeableOwnableProxyStorage.layout().implementation;
    }

    function setImplementation(address implementation) external onlyOwner {
        UpgradeableOwnableProxyStorage.layout().implementation = implementation;
    }
}
