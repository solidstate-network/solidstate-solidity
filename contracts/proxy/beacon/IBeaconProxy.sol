// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IProxy } from '../IProxy.sol';
import { IBeaconProxyInternal } from './IBeaconProxyInternal.sol';

interface IBeaconProxy is IBeaconProxyInternal, IProxy {}
