// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { Proxy } from '../Proxy.sol';
import { OwnableInternal } from '../../access/OwnableInternal.sol';
import { OwnableStorage } from '../../access/OwnableStorage.sol';
import { UpgradeableOwnableProxyStorage } from './UpgradeableOwnableProxyStorage.sol';

abstract contract UpgradeableOwnableProxyBase is OwnableInternal, Proxy {
    using UpgradeableOwnableProxyStorage for UpgradeableOwnableProxyStorage.Layout;
    using OwnableStorage for OwnableStorage.Layout;

    receive() external payable {}

    constructor(address implementation) {
        UpgradeableOwnableProxyStorage.layout().implementation = implementation;
    }

    function _setImplementation(address implementation) internal {
        UpgradeableOwnableProxyStorage.layout().implementation = implementation;
    }

    function _getImplementation() internal view override returns (address) {
        return UpgradeableOwnableProxyStorage.layout().implementation;
    }

    function _getOwner() internal view returns (address) {
        return OwnableStorage.layout().owner;
    }

    function _setOwner(address owner) internal {
        OwnableStorage.layout().setOwner(owner);
    }
}
