// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _Proxy } from '../_Proxy.sol';
import { _IUpgradeableProxy } from './_IUpgradeableProxy.sol';
import { UpgradeableProxyStorage } from './UpgradeableProxyStorage.sol';

abstract contract _UpgradeableProxy is _IUpgradeableProxy, _Proxy {}
