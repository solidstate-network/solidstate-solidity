// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IProxy } from '../IProxy.sol';
import { _IBeaconProxy } from './_IBeaconProxy.sol';

interface IBeaconProxy is _IBeaconProxy, IProxy {}
