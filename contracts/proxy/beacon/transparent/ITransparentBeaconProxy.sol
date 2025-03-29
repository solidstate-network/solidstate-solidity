// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IBeaconProxy } from '../IBeaconProxy.sol';
import { _ITransparentBeaconProxy } from './_ITransparentBeaconProxy.sol';

interface ITransparentBeaconProxy is _ITransparentBeaconProxy, IBeaconProxy {}
