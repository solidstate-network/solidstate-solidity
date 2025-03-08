// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _Ownable } from '../../access/ownable/_Ownable.sol';
import { _Proxy } from '../_Proxy.sol';
import { _IUpgradeableProxy } from './_IUpgradeableProxy.sol';

abstract contract _UpgradeableProxy is _IUpgradeableProxy, _Proxy, _Ownable {
    /**
     * TODO: standardize use of externally accessible functions with "External" suffix
     */
    function _setImplementationExternal(
        address implementation
    ) internal virtual onlyOwner {
        _setImplementation(implementation);
    }
}
