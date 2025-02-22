// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IBeaconProxy } from '../IBeaconProxy.sol';
import { IDiamondBeaconProxyInternal } from './IDiamondBeaconProxyInternal.sol';

interface IDiamondBeaconProxy is IDiamondBeaconProxyInternal, IBeaconProxy {}
