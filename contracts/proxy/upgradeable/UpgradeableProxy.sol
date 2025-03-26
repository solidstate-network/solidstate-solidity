// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Ownable } from '../../access/ownable/Ownable.sol';
import { Proxy } from '../Proxy.sol';
import { IUpgradeableProxy } from './IUpgradeableProxy.sol';
import { _UpgradeableProxy } from './_UpgradeableProxy.sol';

/**
 * @title Proxy with upgradeable implementation controlled by ERC171 owner
 */
abstract contract UpgradeableProxy is
    IUpgradeableProxy,
    _UpgradeableProxy,
    Proxy,
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
