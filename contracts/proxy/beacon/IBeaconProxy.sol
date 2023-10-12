// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { IProxy } from '../IProxy.sol';

interface IBeaconProxy is IProxy {
    error BeaconProxy__FetchImplementationFailed();
}