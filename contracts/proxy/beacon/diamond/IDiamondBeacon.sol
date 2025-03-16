// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IOwnable } from '../../../access/ownable/IOwnable.sol';
import { IDiamondProxyReadable } from '../../diamond/readable/IDiamondProxyReadable.sol';
import { IDiamondProxyWritable } from '../../diamond/writable/IDiamondProxyWritable.sol';
import { _IDiamondBeacon } from './_IDiamondBeacon.sol';

interface IDiamondBeacon is
    _IDiamondBeacon,
    IDiamondProxyReadable,
    IDiamondProxyWritable,
    IOwnable
{}
