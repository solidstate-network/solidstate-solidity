// SPDX-License-Identifier: MIT

import { BeaconProxyInternal } from './BeaconProxyInternal.sol';
import { IDiamondBeacon } from './IDiamondBeacon.sol';
import { IDiamondBeaconProxyInternal } from './IDiamondBeaconProxyInternal.sol';

abstract contract DiamondBeaconProxyInternal is
    IDiamondBeaconProxyInternal,
    BeaconProxyInternal
{
    function _getImplementation()
        internal
        view
        virtual
        override
        returns (address implementation)
    {
        implementation = IDiamondBeacon(_getBeacon()).facetAddress(msg.sig);
    }
}
