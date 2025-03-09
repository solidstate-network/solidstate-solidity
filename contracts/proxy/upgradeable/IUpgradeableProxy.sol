// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IOwnable } from '../../access/ownable/IOwnable.sol';
import { IProxy } from '../IProxy.sol';
import { _IUpgradeableProxy } from './_IUpgradeableProxy.sol';

interface IUpgradeableProxy is _IUpgradeableProxy, IProxy, IOwnable {
    /**
     * TODO: add to IUpgradeableProxy or remove from here
     */
    function setImplementation(address implementation) external;
}
