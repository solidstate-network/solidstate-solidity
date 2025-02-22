// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Ownable } from '../../access/ownable/Ownable.sol';
import { IUpgradeableProxyOwnable } from './IUpgradeableProxyOwnable.sol';
import { UpgradeableProxyOwnableInternal } from './UpgradeableProxyOwnableInternal.sol';
import { UpgradeableProxy } from './UpgradeableProxy.sol';

/**
 * @title Proxy with upgradeable implementation controlled by ERC171 owner
 */
abstract contract UpgradeableProxyOwnable is
    IUpgradeableProxyOwnable,
    UpgradeableProxyOwnableInternal,
    UpgradeableProxy,
    Ownable
{
    /**
     * @notice set logic implementation address
     * @param implementation implementation address
     */
    function setImplementation(address implementation) external onlyOwner {
        _setImplementation(implementation);
    }
}
