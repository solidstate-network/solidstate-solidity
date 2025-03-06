// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IProxyInternal } from './IProxyInternal.sol';

abstract contract ProxyInternal is IProxyInternal {
    /**
     * @notice get logic implementation address
     * @return implementation address
     */
    function _getImplementation() internal virtual returns (address);
}
