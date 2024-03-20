// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IUpgradeableProxy } from './IUpgradeableProxy.sol';

interface IUpgradeableProxyOwnable is IUpgradeableProxy {
    /**
     * TODO: add to IUpgradeableProxy or remove from here
     */
    function setImplementation(address implementation) external;
}
