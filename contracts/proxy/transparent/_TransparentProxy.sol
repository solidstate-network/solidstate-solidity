// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _Proxy } from '../_Proxy.sol';
import { ITransparentProxyWithAdminFunctions } from './ITransparentProxyWithAdminFunctions.sol';
import { _ITransparentProxy } from './_ITransparentProxy.sol';

abstract contract _TransparentProxy is _ITransparentProxy, _Proxy {
    /**
     * @inheritdoc _Proxy
     * @dev calls matching ITransparentProxyWithAdminFunctions are processed internally if sender is admin
     */
    function _fallback() internal virtual override {
        if (
            msg.sig == ITransparentProxyWithAdminFunctions.setAdmin.selector &&
            msg.sender == _getAdmin()
        ) return _setAdmin(address(bytes20(msg.data[16:])));
        if (
            msg.sig ==
            ITransparentProxyWithAdminFunctions.setImplementation.selector &&
            msg.sender == _getAdmin()
        ) return _setImplementation(address(bytes20(msg.data[16:])));
        super._fallback();
    }
}
