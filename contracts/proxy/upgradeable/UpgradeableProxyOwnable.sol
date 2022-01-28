// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { UpgradeableProxy } from './UpgradeableProxy.sol';
import { OwnableInternal } from '../../access/OwnableInternal.sol';

abstract contract UpgradeableProxyOwnable is UpgradeableProxy, OwnableInternal {
    function setImplementation(address implementation) external onlyOwner {
        _setImplementation(implementation);
    }
}
