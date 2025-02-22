// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IProxy } from '../IProxy.sol';
import { IManagedProxyInternal } from './IManagedProxyInternal.sol';

interface IManagedProxy is IManagedProxyInternal, IProxy {}
