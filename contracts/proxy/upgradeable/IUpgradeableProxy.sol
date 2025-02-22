// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IProxy } from '../IProxy.sol';
import { IUpgradeableProxyInternal } from './IUpgradeableProxyInternal.sol';

interface IUpgradeableProxy is IUpgradeableProxyInternal, IProxy {}
