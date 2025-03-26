// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IOwnable } from '../../access/ownable/_IOwnable.sol';
import { _IProxy } from '../_IProxy.sol';

interface _IUpgradeableProxy is _IProxy, _IOwnable {}
