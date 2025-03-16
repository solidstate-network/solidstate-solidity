// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { UpgradeableProxyStorage } from '../storage/UpgradeableProxyStorage.sol';
import { _IProxy } from './_IProxy.sol';

abstract contract _Proxy is _IProxy {
    /**
     * @notice get logic implementation address
     * @return implementation address of implementation contract
     */
    function _getImplementation()
        internal
        view
        virtual
        returns (address implementation)
    {
        // inline storage layout retrieval uses less gas
        UpgradeableProxyStorage.Layout storage $;
        bytes32 slot = UpgradeableProxyStorage.DEFAULT_STORAGE_SLOT;
        assembly {
            $.slot := slot
        }

        implementation = $.implementation;
    }

    /**
     * @notice set logic implementation address
     * @param implementation address of implementation contract
     */
    function _setImplementation(address implementation) internal virtual {
        UpgradeableProxyStorage
            .layout(UpgradeableProxyStorage.DEFAULT_STORAGE_SLOT)
            .implementation = implementation;
    }
}
