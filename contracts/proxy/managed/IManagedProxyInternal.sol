// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IProxyInternal } from '../IProxyInternal.sol';

interface IManagedProxyInternal is IProxyInternal {
    error ManagedProxy__FetchImplementationFailed();
}
