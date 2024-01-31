// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IProxy } from '../IProxy.sol';

interface IManagedProxy is IProxy {
    error ManagedProxy__FetchImplementationFailed();
}
