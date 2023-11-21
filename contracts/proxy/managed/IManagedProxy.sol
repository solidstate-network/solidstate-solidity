// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import { IProxy } from '../IProxy.sol';

interface IManagedProxy is IProxy {
    error ManagedProxy__FetchImplementationFailed();
}
