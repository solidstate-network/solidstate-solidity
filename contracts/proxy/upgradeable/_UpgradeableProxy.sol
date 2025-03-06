// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _Proxy } from '../_Proxy.sol';
import { _IUpgradeableProxy } from './_IUpgradeableProxy.sol';
import { UpgradeableProxyStorage } from './UpgradeableProxyStorage.sol';

abstract contract _UpgradeableProxy is _IUpgradeableProxy, _Proxy {
    /**
     * @inheritdoc _Proxy
     */
    function _getImplementation()
        internal
        view
        virtual
        override
        returns (address)
    {
        // inline storage layout retrieval uses less gas
        UpgradeableProxyStorage.Layout storage l;
        bytes32 slot = UpgradeableProxyStorage.STORAGE_SLOT;
        assembly {
            l.slot := slot
        }

        return l.implementation;
    }

    /**
     * @notice set logic implementation address
     * @param implementation implementation address
     */
    function _setImplementation(address implementation) internal virtual {
        UpgradeableProxyStorage.layout().implementation = implementation;
    }
}
