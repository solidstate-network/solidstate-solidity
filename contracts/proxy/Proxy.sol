// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IProxy } from './IProxy.sol';
import { _Proxy } from './_Proxy.sol';

/**
 * @title Base proxy contract
 */
abstract contract Proxy is IProxy, _Proxy {
    /**
     * @inheritdoc IProxy
     * @dev reverts if implementation address contains no code
     */
    fallback() external payable {
        _fallback();
    }

    receive() external payable {
        _receive();
    }
}
