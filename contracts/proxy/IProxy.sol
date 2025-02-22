// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IProxyInternal } from './IProxyInternal.sol';

interface IProxy is IProxyInternal {
    error Proxy__ImplementationIsNotContract();

    fallback() external payable;
}
