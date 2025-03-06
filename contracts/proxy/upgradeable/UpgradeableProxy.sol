// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Proxy } from '../Proxy.sol';
import { _Proxy } from '../_Proxy.sol';
import { IUpgradeableProxy } from './IUpgradeableProxy.sol';
import { _UpgradeableProxy } from './_UpgradeableProxy.sol';
import { UpgradeableProxyStorage } from './UpgradeableProxyStorage.sol';

/**
 * @title Proxy with upgradeable implementation
 */
abstract contract UpgradeableProxy is
    IUpgradeableProxy,
    _UpgradeableProxy,
    Proxy
{}
