// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IOwnable } from '../../access/ownable/IOwnable.sol';
import { IManagedProxy } from './IManagedProxy.sol';
import { IManagedProxyOwnableInternal } from './IManagedProxyOwnableInternal.sol';

interface IManagedProxyOwnable is
    IManagedProxyOwnableInternal,
    IManagedProxy,
    IOwnable
{}
