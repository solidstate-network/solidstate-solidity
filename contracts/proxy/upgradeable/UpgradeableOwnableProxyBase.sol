// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { OwnableInternal } from '../../access/OwnableInternal.sol';
import { OwnableStorage } from '../../access/OwnableStorage.sol';
import { UpgradeableProxy } from './UpgradeableProxy.sol';
import { UpgradeableProxyStorage } from './UpgradeableProxyStorage.sol';

abstract contract UpgradeableOwnableProxyBase is
    UpgradeableProxy,
    OwnableInternal
{
    using UpgradeableProxyStorage for UpgradeableProxyStorage.Layout;
    using OwnableStorage for OwnableStorage.Layout;

    receive() external payable {}

    constructor(address implementation) {
        UpgradeableProxyStorage.layout().setImplementation(implementation);
    }

    function _getOwner() internal view returns (address) {
        return OwnableStorage.layout().owner;
    }

    function _setOwner(address owner) internal {
        OwnableStorage.layout().setOwner(owner);
    }
}
