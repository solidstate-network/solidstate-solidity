// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { UpgradeableProxy } from './UpgradeableProxy.sol';
import { OwnableInternal } from '../../access/OwnableInternal.sol';

/**
 * @title Proxy with upgradeable implementation controlled by ERC171 owner
 */
abstract contract UpgradeableProxyOwnable is UpgradeableProxy, OwnableInternal {
    /**
     * @notice set logic implementation address
     * @param implementation implementation address
     */
    function setImplementation(address implementation) external onlyOwner {
        _setImplementation(implementation);
    }
}
