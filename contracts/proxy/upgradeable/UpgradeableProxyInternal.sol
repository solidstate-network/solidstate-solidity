// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ProxyInternal } from '../ProxyInternal.sol';
import { IUpgradeableProxyInternal } from './IUpgradeableProxyInternal.sol';
import { UpgradeableProxyStorage } from './UpgradeableProxyStorage.sol';

abstract contract UpgradeableProxyInternal is
    IUpgradeableProxyInternal,
    ProxyInternal
{
    /**
     * @inheritdoc ProxyInternal
     */
    function _getImplementation() internal view override returns (address) {
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
    function _setImplementation(address implementation) internal {
        UpgradeableProxyStorage.layout().implementation = implementation;
    }
}
