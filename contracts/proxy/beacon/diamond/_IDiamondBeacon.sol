// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IOwnable } from '../../../access/ownable/_IOwnable.sol';
import { _IDiamondReadable } from '../../diamond/readable/_IDiamondReadable.sol';
import { _IDiamondWritable } from '../../diamond/writable/_IDiamondWritable.sol';

interface _IDiamondBeacon is _IOwnable, _IDiamondReadable, _IDiamondWritable {
    error DiamondBeacon__InvalidInput();
}
