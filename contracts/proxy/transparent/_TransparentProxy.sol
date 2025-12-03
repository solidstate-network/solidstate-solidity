// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _Proxy } from '../_Proxy.sol';
import { _ITransparentProxy } from './_ITransparentProxy.sol';
import { ITransparentProxyWithAdminFunctions } from './ITransparentProxyWithAdminFunctions.sol';

abstract contract _TransparentProxy is _ITransparentProxy, _Proxy {
    /**
     * @inheritdoc _Proxy
     * @dev calls matching ITransparentProxyWithAdminFunctions are processed internally if sender is admin
     */
    function _fallback() internal virtual override {
        if (
            msg.sig ==
                ITransparentProxyWithAdminFunctions.setProxyAdmin.selector &&
            _msgSender() == _getProxyAdmin()
        ) return _setProxyAdmin(address(bytes20(_msgData()[16:])));
        if (
            msg.sig ==
                ITransparentProxyWithAdminFunctions
                    .setImplementation
                    .selector &&
            _msgSender() == _getProxyAdmin()
        ) return _setImplementation(address(bytes20(_msgData()[16:])));
        super._fallback();
    }
}
