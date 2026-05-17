// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { IProxy } from '../IProxy.sol';
import { _IDiamondProxy } from './_IDiamondProxy.sol';

interface IDiamondProxy is _IDiamondProxy, IProxy {}
