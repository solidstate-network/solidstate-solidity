// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { DiamondProxyExecutable } from '../executable/DiamondProxyExecutable.sol';
import { IDiamondProxyFallback } from './IDiamondProxyFallback.sol';
import { _DiamondProxyFallback } from './_DiamondProxyFallback.sol';

/**
 * @title Fallback feature for EIP-2535 "Diamond" proxy
 */
abstract contract DiamondProxyFallback is
    IDiamondProxyFallback,
    _DiamondProxyFallback,
    DiamondProxyExecutable
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
        override(DiamondProxyExecutable, _DiamondProxyFallback)
        returns (address implementation)
    {
        implementation = super._getImplementation();
    }
}
