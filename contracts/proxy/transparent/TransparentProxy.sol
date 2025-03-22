// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Proxy } from '../Proxy.sol';
import { _Proxy } from '../_Proxy.sol';
import { ITransparentProxy } from './ITransparentProxy.sol';
import { _TransparentProxy } from './_TransparentProxy.sol';

/**
 * @title Proxy with upgradeable implementation controlled by ERC171 owner
 */
abstract contract TransparentProxy is
    ITransparentProxy,
    _TransparentProxy,
    Proxy
{
    function _fallback() internal virtual override(_Proxy, _TransparentProxy) {
        super._fallback();
    }
}
