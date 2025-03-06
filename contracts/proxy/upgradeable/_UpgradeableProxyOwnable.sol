// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _Ownable } from '../../access/ownable/_Ownable.sol';
import { _UpgradeableProxy } from './_UpgradeableProxy.sol';
import { _IUpgradeableProxyOwnable } from './_IUpgradeableProxyOwnable.sol';

abstract contract _UpgradeableProxyOwnable is
    _IUpgradeableProxyOwnable,
    _UpgradeableProxy,
    _Ownable
{}
