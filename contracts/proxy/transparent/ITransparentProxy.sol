// SPDX-License-Identifier: MIT

pragma solidity ^0.8.35;

import { IProxy } from '../IProxy.sol';
import { _ITransparentProxy } from './_ITransparentProxy.sol';

interface ITransparentProxy is _ITransparentProxy, IProxy {}
