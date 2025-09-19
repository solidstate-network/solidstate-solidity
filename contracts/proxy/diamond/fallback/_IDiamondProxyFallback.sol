// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IDiamondProxy } from '../_IDiamondProxy.sol';
import { _IOwnable } from '../../../access/ownable/_IOwnable.sol';

interface _IDiamondProxyFallback is _IDiamondProxy, _IOwnable {}
