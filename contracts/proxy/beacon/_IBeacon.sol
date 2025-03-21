// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IOwnable } from '../../access/ownable/_IOwnable.sol';
import { _IERC1967Beacon } from '../../interfaces/_IERC1967Beacon.sol';

interface _IBeacon is _IERC1967Beacon, _IOwnable {}
