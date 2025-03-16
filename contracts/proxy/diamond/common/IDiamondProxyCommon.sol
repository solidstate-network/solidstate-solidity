// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IProxy } from '../../IProxy.sol';
import { _IDiamondProxyCommon } from './_IDiamondProxyCommon.sol';

interface IDiamondProxyCommon is _IDiamondProxyCommon, IProxy {}
