// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IProxy } from '../../_IProxy.sol';
import { _IDiamondProxyCommon } from '../common/_IDiamondProxyCommon.sol';

interface _IDiamondProxyExecutable is _IDiamondProxyCommon, _IProxy {}
