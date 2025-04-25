// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IBeaconProxy } from '../IBeaconProxy.sol';
import { _IDiamondBeaconProxy } from './_IDiamondBeaconProxy.sol';

interface IDiamondBeaconProxy is _IDiamondBeaconProxy, IBeaconProxy {}
