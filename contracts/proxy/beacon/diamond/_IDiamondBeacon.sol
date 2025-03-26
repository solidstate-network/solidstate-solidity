// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IOwnable } from '../../../access/ownable/_IOwnable.sol';
import { _IDiamondProxyReadable } from '../../diamond/readable/_IDiamondProxyReadable.sol';
import { _IDiamondProxyWritable } from '../../diamond/writable/_IDiamondProxyWritable.sol';

interface _IDiamondBeacon is
    _IOwnable,
    _IDiamondProxyReadable,
    _IDiamondProxyWritable
{
    error DiamondBeacon__InvalidInput();
}
