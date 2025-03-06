// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IProxy } from './_IProxy.sol';

abstract contract _Proxy is _IProxy {
    /**
     * @notice get logic implementation address
     * @return implementation address
     */
    function _getImplementation() internal virtual returns (address);
}
