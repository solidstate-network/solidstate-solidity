// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC1967Proxy } from '../interfaces/_IERC1967Proxy.sol';

interface _IProxy is _IERC1967Proxy {
    error Proxy__ImplementationIsNotContract();
    error Proxy__SenderIsNotAdmin();
}
