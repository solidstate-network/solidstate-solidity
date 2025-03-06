// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IOwnable } from '../../access/ownable/IOwnable.sol';
import { IUpgradeableProxy } from './IUpgradeableProxy.sol';
import { _IUpgradeableProxyOwnable } from './_IUpgradeableProxyOwnable.sol';

interface IUpgradeableProxyOwnable is
    _IUpgradeableProxyOwnable,
    IUpgradeableProxy,
    IOwnable
{
    /**
     * TODO: add to IUpgradeableProxy or remove from here
     */
    function setImplementation(address implementation) external;
}
