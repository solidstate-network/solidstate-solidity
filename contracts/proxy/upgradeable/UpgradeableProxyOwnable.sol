// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Ownable } from '../../access/ownable/Ownable.sol';
import { IUpgradeableProxyOwnable } from './IUpgradeableProxyOwnable.sol';
import { _UpgradeableProxyOwnable } from './_UpgradeableProxyOwnable.sol';
import { UpgradeableProxy } from './UpgradeableProxy.sol';

/**
 * @title Proxy with upgradeable implementation controlled by ERC171 owner
 */
abstract contract UpgradeableProxyOwnable is
    IUpgradeableProxyOwnable,
    _UpgradeableProxyOwnable,
    UpgradeableProxy,
    Ownable
{
    /**
     * @notice set logic implementation address
     * @param implementation implementation address
     */
    function setImplementation(address implementation) external {
        _setImplementationExternal(implementation);
    }
}
