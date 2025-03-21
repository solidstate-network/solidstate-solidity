// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { BeaconProxy } from '../BeaconProxy.sol';
import { _BeaconProxy } from '../_BeaconProxy.sol';
import { ITransparentBeaconProxy } from './ITransparentBeaconProxy.sol';
import { _TransparentBeaconProxy } from './_TransparentBeaconProxy.sol';

abstract contract TransparentBeaconProxy is
    ITransparentBeaconProxy,
    _TransparentBeaconProxy,
    BeaconProxy
{
    /**
     * @inheritdoc ITransparentBeaconProxy
     */
    function setAdmin(address admin) external {
        _setAdminExternal(admin);
    }

    /**
     * @inheritdoc ITransparentBeaconProxy
     */
    function setBeacon(address beacon) external {
        _setBeaconExternal(beacon);
    }

    function _getImplementation()
        internal
        view
        virtual
        override(_BeaconProxy, BeaconProxy)
        returns (address implementation)
    {
        implementation = super._getImplementation();
    }
}
