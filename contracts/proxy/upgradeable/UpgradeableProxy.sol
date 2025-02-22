// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Proxy } from '../Proxy.sol';
import { ProxyInternal } from '../ProxyInternal.sol';
import { IUpgradeableProxy } from './IUpgradeableProxy.sol';
import { UpgradeableProxyInternal } from './UpgradeableProxyInternal.sol';
import { UpgradeableProxyStorage } from './UpgradeableProxyStorage.sol';

/**
 * @title Proxy with upgradeable implementation
 */
abstract contract UpgradeableProxy is
    IUpgradeableProxy,
    UpgradeableProxyInternal,
    Proxy
{}
