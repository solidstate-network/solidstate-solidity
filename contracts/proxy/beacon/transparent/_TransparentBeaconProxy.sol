// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _Proxy } from '../../_Proxy.sol';
import { _BeaconProxy } from '../_BeaconProxy.sol';
import { ITransparentBeaconProxyWithAdminFunctions } from './ITransparentBeaconProxyWithAdminFunctions.sol';
import { _ITransparentBeaconProxy } from './_ITransparentBeaconProxy.sol';

abstract contract _TransparentBeaconProxy is
    _ITransparentBeaconProxy,
    _BeaconProxy
{
    /**
     * @inheritdoc _Proxy
     * @dev calls matching ITransparentBeaconProxyWithAdminFunctions are processed internally if sender is admin
     */
    function _fallback() internal virtual override {
        if (
            msg.sig ==
            ITransparentBeaconProxyWithAdminFunctions.setProxyAdmin.selector &&
            msg.sender == _getProxyAdmin()
        ) return _setProxyAdmin(address(bytes20(msg.data[16:])));
        if (
            msg.sig ==
            ITransparentBeaconProxyWithAdminFunctions.setBeacon.selector &&
            msg.sender == _getProxyAdmin()
        ) return _setBeacon(address(bytes20(msg.data[16:])));
        super._fallback();
    }
}
