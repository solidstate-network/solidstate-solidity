// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Context } from '../meta/Context.sol';
import { IProxy } from './IProxy.sol';
import { _Proxy } from './_Proxy.sol';

/**
 * @title Base proxy contract
 */
abstract contract Proxy is IProxy, _Proxy, Context {
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
