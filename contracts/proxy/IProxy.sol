// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1967Proxy } from '../interfaces/IERC1967Proxy.sol';
import { _IProxy } from './_IProxy.sol';

interface IProxy is _IProxy, IERC1967Proxy {
    fallback() external payable;
}
