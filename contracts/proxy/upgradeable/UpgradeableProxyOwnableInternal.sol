// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { OwnableInternal } from '../../access/ownable/OwnableInternal.sol';
import { UpgradeableProxyInternal } from './UpgradeableProxyInternal.sol';
import { IUpgradeableProxyOwnableInternal } from './IUpgradeableProxyOwnableInternal.sol';

abstract contract UpgradeableProxyOwnableInternal is
    IUpgradeableProxyOwnableInternal,
    UpgradeableProxyInternal,
    OwnableInternal
{}
