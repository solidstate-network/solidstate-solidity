// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IOwnableInternal } from '../../access/ownable/IOwnableInternal.sol';
import { IUpgradeableProxyInternal } from './IUpgradeableProxyInternal.sol';

interface IUpgradeableProxyOwnableInternal is
    IUpgradeableProxyInternal,
    IOwnableInternal
{}
