// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IProxy } from '../../IProxy.sol';
import { IDiamondBaseInternal } from './IDiamondBaseInternal.sol';

interface IDiamondBase is IDiamondBaseInternal, IProxy {}
