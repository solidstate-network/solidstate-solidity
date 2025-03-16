// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Proxy } from '../../Proxy.sol';
import { _Proxy } from '../../_Proxy.sol';
import { IDiamondProxyCommon } from './IDiamondProxyCommon.sol';
import { _DiamondProxyCommon } from './_DiamondProxyCommon.sol';

/**
 * @title EIP-2535 "Diamond" proxy base contract
 * @dev see https://eips.ethereum.org/EIPS/eip-2535
 * @dev note that for EIP-2535 compliance this base contract must also include the DiamondProxyReadable functions (either within the same deployment or by proxy)
 */
contract DiamondProxyCommon is IDiamondProxyCommon, _DiamondProxyCommon, Proxy {
    /**
     * @inheritdoc _DiamondProxyCommon
     */
    function _getImplementation()
        internal
        view
        virtual
        override(_Proxy, _DiamondProxyCommon)
        returns (address implementation)
    {
        implementation = super._getImplementation();
    }
}
