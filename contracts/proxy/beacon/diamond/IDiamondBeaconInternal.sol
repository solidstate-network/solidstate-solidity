// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IOwnableInternal } from '../../../access/ownable/IOwnableInternal.sol';
import { IDiamondReadableInternal } from '../../diamond/readable/IDiamondReadableInternal.sol';
import { IDiamondWritableInternal } from '../../diamond/writable/IDiamondWritableInternal.sol';

interface IDiamondBeaconInternal is
    IOwnableInternal,
    IDiamondReadableInternal,
    IDiamondWritableInternal
{
    error DiamondBeacon__InvalidInput();
}
