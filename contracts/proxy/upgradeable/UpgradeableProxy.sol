// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { Proxy } from '../Proxy.sol';
import { UpgradeableProxyStorage } from './UpgradeableProxyStorage.sol';

/**
 * @title Proxy with upgradeable implementation
 */
abstract contract UpgradeableProxy is Proxy {
    /**
     * @inheritdoc Proxy
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
}
