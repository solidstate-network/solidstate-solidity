// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Proxy } from '../Proxy.sol';
import { ProxyInternal } from '../ProxyInternal.sol';
import { IManagedProxy } from './IManagedProxy.sol';
import { ManagedProxyInternal } from './ManagedProxyInternal.sol';

/**
 * @title Proxy with externally controlled implementation
 * @dev implementation fetched using immutable function selector
 */
abstract contract ManagedProxy is IManagedProxy, ManagedProxyInternal, Proxy {
    /**
     * @param managerSelector function selector used to fetch implementation from manager
     */
    constructor(bytes4 managerSelector) {
        MANAGER_SELECTOR = managerSelector;
    }
}
