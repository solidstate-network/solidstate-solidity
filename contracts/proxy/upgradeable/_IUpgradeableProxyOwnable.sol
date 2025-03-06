// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IOwnable } from '../../access/ownable/_IOwnable.sol';
import { _IUpgradeableProxy } from './_IUpgradeableProxy.sol';

interface _IUpgradeableProxyOwnable is _IUpgradeableProxy, _IOwnable {}
