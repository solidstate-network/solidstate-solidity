// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _Proxy } from '../_Proxy.sol';
import { Proxy } from '../Proxy.sol';
import { _DiamondProxy } from './_DiamondProxy.sol';
import { IDiamondProxy } from './IDiamondProxy.sol';

/**
 * @title EIP-2535 "Diamond" proxy base contract
 * @dev see https://eips.ethereum.org/EIPS/eip-2535
 * @dev note that for EIP-2535 compliance this base contract must also include the DiamondProxyReadable functions (either within the same deployment or by proxy)
 */
contract DiamondProxy is IDiamondProxy, _DiamondProxy, Proxy {
    /**
     * @inheritdoc _DiamondProxy
     */
    function _getImplementation()
        internal
        view
        virtual
        override(_Proxy, _DiamondProxy)
        returns (address implementation)
    {
        implementation = super._getImplementation();
    }
}
