// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Proxy } from '../../Proxy.sol';
import { _Proxy } from '../../_Proxy.sol';
import { IDiamondBase } from './IDiamondBase.sol';
import { _DiamondBase } from './_DiamondBase.sol';

/**
 * @title EIP-2535 "Diamond" proxy base contract
 * @dev see https://eips.ethereum.org/EIPS/eip-2535
 * @dev note that for EIP-2535 compliance this base contract must also include the DiamondReadable functions (either within the same deployment or by proxy)
 */
abstract contract DiamondBase is IDiamondBase, _DiamondBase, Proxy {
    /**
     * @inheritdoc _DiamondBase
     */
    function _getImplementation()
        internal
        view
        virtual
        override(_Proxy, _DiamondBase)
        returns (address implementation)
    {
        implementation = super._getImplementation();
    }
}
