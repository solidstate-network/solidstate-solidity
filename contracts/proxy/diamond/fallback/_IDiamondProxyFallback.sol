// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IOwnable } from '../../../access/ownable/_IOwnable.sol';
import { _IDiamondProxyExecutable } from '../executable/_IDiamondProxyExecutable.sol';

interface _IDiamondProxyFallback is _IDiamondProxyExecutable, _IOwnable {}
