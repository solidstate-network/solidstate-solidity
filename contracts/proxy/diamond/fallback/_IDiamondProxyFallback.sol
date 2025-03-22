// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IOwnable } from '../../../access/ownable/_IOwnable.sol';
import { _IDiamondProxy } from '../_IDiamondProxy.sol';

interface _IDiamondProxyFallback is _IDiamondProxy, _IOwnable {}
