// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { UpgradeableOwnableProxyBase } from './UpgradeableOwnableProxyBase.sol';
import { Proxy } from '../Proxy.sol';
import { OwnableInternal } from '../../access/OwnableInternal.sol';
import { OwnableStorage } from '../../access/OwnableStorage.sol';
import { UpgradeableOwnableProxyStorage } from './UpgradeableOwnableProxyStorage.sol';

contract UpgradeableOwnableProxy is UpgradeableOwnableProxyBase {
    using UpgradeableOwnableProxyStorage for UpgradeableOwnableProxyStorage.Layout;
    using OwnableStorage for OwnableStorage.Layout;

    constructor(address implementation)
        UpgradeableOwnableProxyBase(implementation)
    {
        _setOwner(msg.sender);
    }
}
