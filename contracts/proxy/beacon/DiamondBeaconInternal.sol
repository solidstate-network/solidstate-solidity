// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { OwnableInternal } from '../../access/ownable/OwnableInternal.sol';
import { DiamondReadableInternal } from '../diamond/readable/DiamondReadableInternal.sol';
import { DiamondWritableInternal } from '../diamond/writable/DiamondWritableInternal.sol';

import { IDiamondBeaconInternal } from './IDiamondBeaconInternal.sol';

abstract contract DiamondBeaconInternal is
    IDiamondBeaconInternal,
    OwnableInternal,
    DiamondReadableInternal,
    DiamondWritableInternal
{}
