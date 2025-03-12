// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IProxy } from '../../IProxy.sol';
import { IDiamondCommon } from '../common/IDiamondCommon.sol';
import { _IDiamondBase } from './_IDiamondBase.sol';

interface IDiamondBase is _IDiamondBase, IDiamondCommon, IProxy {}
