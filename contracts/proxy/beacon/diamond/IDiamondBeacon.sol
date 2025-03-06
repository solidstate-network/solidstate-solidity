// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IOwnable } from '../../../access/ownable/IOwnable.sol';
import { IDiamondReadable } from '../../diamond/readable/IDiamondReadable.sol';
import { IDiamondWritable } from '../../diamond/writable/IDiamondWritable.sol';
import { _IDiamondBeacon } from './_IDiamondBeacon.sol';

interface IDiamondBeacon is
    _IDiamondBeacon,
    IDiamondReadable,
    IDiamondWritable,
    IOwnable
{}
