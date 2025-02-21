// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { AddressUtils } from '../utils/AddressUtils.sol';
import { IProxyInternal } from './IProxyInternal.sol';

abstract contract ProxyInternal is IProxyInternal {
    using AddressUtils for address;

    /**
     * @notice delegate all calls to implementation contract
     */
    function _handleDelegateCall() internal virtual returns (bytes memory) {
        address implementation = _getImplementation();
        return implementation.functionDelegateCall(msg.data);
    }

    /**
     * @notice get logic implementation address
     * @return implementation address
     */
    function _getImplementation() internal virtual returns (address);
}
