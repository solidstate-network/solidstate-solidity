// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IOwnableInternal } from '../../access/ownable/IOwnableInternal.sol';
import { IManagedProxyInternal } from './IManagedProxyInternal.sol';

interface IManagedProxyOwnableInternal is
    IManagedProxyInternal,
    IOwnableInternal
{}
