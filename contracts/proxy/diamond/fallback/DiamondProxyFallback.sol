// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { DiamondProxy } from '../DiamondProxy.sol';
import { _DiamondProxyFallback } from './_DiamondProxyFallback.sol';
import { IDiamondProxyFallback } from './IDiamondProxyFallback.sol';

/**
 * @title Fallback feature for EIP-2535 "Diamond" proxy
 */
abstract contract DiamondProxyFallback is
    IDiamondProxyFallback,
    _DiamondProxyFallback,
    DiamondProxy
{
    /**
     * @inheritdoc IDiamondProxyFallback
     */
    function getFallbackAddress()
        external
        view
        returns (address fallbackAddress)
    {
        fallbackAddress = _getFallbackAddress();
    }

    /**
     * @inheritdoc IDiamondProxyFallback
     */
    function setFallbackAddress(address fallbackAddress) external {
        _setFallbackAddressExternal(fallbackAddress);
    }

    /**
     * @inheritdoc _DiamondProxyFallback
     */
    function _getImplementation()
        internal
        view
        virtual
        override(DiamondProxy, _DiamondProxyFallback)
        returns (address implementation)
    {
        implementation = super._getImplementation();
    }
}
