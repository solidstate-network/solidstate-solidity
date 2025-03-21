// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _BeaconProxy } from '../_BeaconProxy.sol';
import { _ITransparentBeaconProxy } from './_ITransparentBeaconProxy.sol';

abstract contract _TransparentBeaconProxy is
    _ITransparentBeaconProxy,
    _BeaconProxy
{
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
    function _setBeaconExternal(address beacon) internal virtual {
        if (msg.sender == _getAdmin()) {
            _setBeacon(beacon);
        } else {
            _fallback();
        }
    }
}
