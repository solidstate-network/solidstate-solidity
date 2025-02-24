// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Proxy } from '../Proxy.sol';
import { IBeaconProxy } from './IBeaconProxy.sol';
import { BeaconProxyInternal } from './BeaconProxyInternal.sol';

/**
 * @title Proxy with externally controlled implementation
 * @dev implementation fetched using immutable function selector
 */
abstract contract BeaconProxy is IBeaconProxy, BeaconProxyInternal, Proxy {}
