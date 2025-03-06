// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _Proxy } from '../../_Proxy.sol';
import { _IDiamondBase } from './_IDiamondBase.sol';
import { DiamondBaseStorage } from './DiamondBaseStorage.sol';

abstract contract _DiamondBase is _IDiamondBase, _Proxy {
    /**
     * @inheritdoc _Proxy
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
