// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IOwnable } from '../../../access/ownable/IOwnable.sol';
import { IDiamondReadable } from '../../diamond/readable/IDiamondReadable.sol';
import { IDiamondProxyWritable } from '../../diamond/writable/IDiamondProxyWritable.sol';
import { _IDiamondBeacon } from './_IDiamondBeacon.sol';

interface IDiamondBeacon is
    _IDiamondBeacon,
    IDiamondReadable,
    IDiamondProxyWritable,
    IOwnable
{}
