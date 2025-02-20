// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IUpgradeableProxy } from './IUpgradeableProxy.sol';
import { IUpgradeableProxyOwnableInternal } from './IUpgradeableProxyOwnableInternal.sol';

interface IUpgradeableProxyOwnable is
    IUpgradeableProxyOwnableInternal,
    IUpgradeableProxy
{
    /**
     * TODO: add to IUpgradeableProxy or remove from here
     */
    function setImplementation(address implementation) external;
}
