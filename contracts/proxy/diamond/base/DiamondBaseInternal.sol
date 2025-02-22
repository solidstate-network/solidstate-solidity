// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ProxyInternal } from '../../ProxyInternal.sol';
import { IDiamondBaseInternal } from './IDiamondBaseInternal.sol';
import { DiamondBaseStorage } from './DiamondBaseStorage.sol';

abstract contract DiamondBaseInternal is IDiamondBaseInternal, ProxyInternal {
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
        // inline storage layout retrieval uses less gas
        DiamondBaseStorage.Layout storage l;
        bytes32 slot = DiamondBaseStorage.STORAGE_SLOT;
        assembly {
            l.slot := slot
        }

        implementation = address(bytes20(l.selectorInfo[msg.sig]));
    }
}
