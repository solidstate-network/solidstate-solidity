// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IProxy } from '../IProxy.sol';
import { _IUpgradeableProxy } from './_IUpgradeableProxy.sol';

interface IUpgradeableProxy is _IUpgradeableProxy, IProxy {}
