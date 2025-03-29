// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IOwnable } from '../../access/ownable/_IOwnable.sol';
import { _IDiamondProxyWritable } from '../../proxy/diamond/writable/_IDiamondProxyWritable.sol';

interface _IDiamondBeacon is _IOwnable, _IDiamondProxyWritable {}
