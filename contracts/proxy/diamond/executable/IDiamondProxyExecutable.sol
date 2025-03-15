// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IProxy } from '../../IProxy.sol';
import { IDiamondProxyCommon } from '../common/IDiamondProxyCommon.sol';
import { _IDiamondProxyExecutable } from './_IDiamondProxyExecutable.sol';

interface IDiamondProxyExecutable is
    _IDiamondProxyExecutable,
    IDiamondProxyCommon,
    IProxy
{}
