// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IProxy } from './IProxy.sol';
import { _Proxy } from './_Proxy.sol';

/**
 * @title Base proxy contract
 */
abstract contract Proxy is IProxy, _Proxy {
    /**
     * @notice delegate all calls to implementation contract
     * @dev reverts if implementation address contains no code
     */
    fallback() external payable {
        _fallback();
    }
}
