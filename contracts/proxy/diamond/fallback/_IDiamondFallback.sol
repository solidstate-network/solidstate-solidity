// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IOwnable } from '../../../access/ownable/_IOwnable.sol';
import { _IDiamondBase } from '../base/_IDiamondBase.sol';

interface _IDiamondFallback is _IDiamondBase, _IOwnable {}
