// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IOwnable } from '../../../access/ownable/_IOwnable.sol';
import { _IDiamondProxyCommon } from '../common/_IDiamondProxyCommon.sol';

interface _IDiamondProxyFallback is _IDiamondProxyCommon, _IOwnable {}
