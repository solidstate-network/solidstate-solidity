// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IProxy } from '../../_IProxy.sol';
import { _IDiamondCommon } from '../common/_IDiamondCommon.sol';

interface _IDiamondBase is _IDiamondCommon, _IProxy {}
