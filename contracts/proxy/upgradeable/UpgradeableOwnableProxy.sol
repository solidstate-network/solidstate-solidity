// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { UpgradeableOwnableProxyBase } from './UpgradeableOwnableProxyBase.sol';
import { Proxy } from '../Proxy.sol';
import { OwnableInternal } from '../../access/OwnableInternal.sol';
import { OwnableStorage } from '../../access/OwnableStorage.sol';
import { UpgradeableProxyStorage } from './UpgradeableProxyStorage.sol';

contract UpgradeableOwnableProxy is UpgradeableOwnableProxyBase {
    using UpgradeableProxyStorage for UpgradeableProxyStorage.Layout;
    using OwnableStorage for OwnableStorage.Layout;

    constructor(address implementation)
        UpgradeableOwnableProxyBase(implementation)
    {
        _setOwner(msg.sender);
    }
}
