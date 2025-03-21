// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Proxy } from '../Proxy.sol';
import { IUpgradeableProxy } from './IUpgradeableProxy.sol';
import { _UpgradeableProxy } from './_UpgradeableProxy.sol';

/**
 * @title Proxy with upgradeable implementation controlled by ERC171 owner
 */
abstract contract UpgradeableProxy is
    IUpgradeableProxy,
    _UpgradeableProxy,
    Proxy
{
    /**
     * @inheritdoc IUpgradeableProxy
     */
    function setAdmin(address admin) external {
        _setAdminExternal(admin);
    }

    /**
     * @inheritdoc IUpgradeableProxy
     */
    function setImplementation(address implementation) external {
        _setImplementationExternal(implementation);
    }
}
