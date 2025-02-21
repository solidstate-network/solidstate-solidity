// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ProxyInternal } from '../ProxyInternal.sol';
import { IBeacon } from './IBeacon.sol';
import { IBeaconProxyInternal } from './IBeaconProxyInternal.sol';

abstract contract BeaconProxyInternal is IBeaconProxyInternal, ProxyInternal {
    /**
     * @inheritdoc ProxyInternal
     */
    function _getImplementation()
        internal
        view
        virtual
        override
        returns (address implementation)
    {
        implementation = IBeacon(_getBeacon()).getImplementation();
    }

    /**
     * @notice get beacon of proxy implementation
     * @return beacon address
     */
    function _getBeacon() internal view virtual returns (address);
}
