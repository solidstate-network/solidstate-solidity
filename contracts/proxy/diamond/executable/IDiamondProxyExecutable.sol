// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IProxy } from '../../IProxy.sol';
import { IDiamondCommon } from '../common/IDiamondCommon.sol';
import { _IDiamondProxyExecutable } from './_IDiamondProxyExecutable.sol';

interface IDiamondProxyExecutable is
    _IDiamondProxyExecutable,
    IDiamondCommon,
    IProxy
{}
