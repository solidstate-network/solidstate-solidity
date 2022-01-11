// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { Proxy } from '../Proxy.sol';
import { OwnableInternal } from '../../access/OwnableInternal.sol';
import { OwnableStorage } from '../../access/OwnableStorage.sol';
import { UpgradeableProxyStorage } from './UpgradeableProxyStorage.sol';

abstract contract UpgradeableOwnableProxyBase is OwnableInternal, Proxy {
    using UpgradeableProxyStorage for UpgradeableProxyStorage.Layout;
    using OwnableStorage for OwnableStorage.Layout;

    receive() external payable {}

    constructor(address implementation) {
        UpgradeableProxyStorage.layout().setImplementation(implementation);
    }

    function _getImplementation() internal view override returns (address) {
        return UpgradeableProxyStorage.layout().implementation;
    }

    function _getOwner() internal view returns (address) {
        return OwnableStorage.layout().owner;
    }

    function _setOwner(address owner) internal {
        OwnableStorage.layout().setOwner(owner);
    }
}
