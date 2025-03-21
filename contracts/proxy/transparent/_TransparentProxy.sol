// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _Proxy } from '../_Proxy.sol';
import { _ITransparentProxy } from './_ITransparentProxy.sol';

abstract contract _TransparentProxy is _ITransparentProxy, _Proxy {
    /**
     * TODO: standardize use of externally accessible functions with "External" suffix
     */
    function _setAdminExternal(address admin) internal virtual {
        if (msg.sender == _getAdmin()) {
            _setAdmin(admin);
        } else {
            _fallback();
        }
    }

    /**
     * TODO: standardize use of externally accessible functions with "External" suffix
     */
    function _setImplementationExternal(
        address implementation
    ) internal virtual {
        if (msg.sender == _getAdmin()) {
            _setImplementation(implementation);
        } else {
            _fallback();
        }
    }
}
