// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Ownable } from '../../access/ownable/Ownable.sol';
import { IManagedProxyOwnable } from './IManagedProxyOwnable.sol';
import { ManagedProxyOwnableInternal } from './ManagedProxyOwnableInternal.sol';
import { ManagedProxy } from './ManagedProxy.sol';

/**
 * @title Proxy with implementation controlled by ERC171 owner
 */
abstract contract ManagedProxyOwnable is
    IManagedProxyOwnable,
    ManagedProxyOwnableInternal,
    ManagedProxy,
    Ownable
{}
