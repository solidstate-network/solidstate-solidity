// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { _IERC1967Proxy } from '../interfaces/_IERC1967Proxy.sol';
import { _IContext } from '../meta/_IContext.sol';

interface _IProxy is _IERC1967Proxy, _IContext {
    error Proxy__ImplementationIsNotContract();
    error Proxy__SenderIsNotAdmin();
}
