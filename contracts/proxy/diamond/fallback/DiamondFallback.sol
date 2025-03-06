// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _Proxy } from '../../_Proxy.sol';
import { DiamondBase } from '../base/DiamondBase.sol';
import { _DiamondBase } from '../base/_DiamondBase.sol';
import { DiamondBaseStorage } from '../base/DiamondBaseStorage.sol';
import { IDiamondFallback } from './IDiamondFallback.sol';
import { _DiamondFallback } from './_DiamondFallback.sol';

/**
 * @title Fallback feature for EIP-2535 "Diamond" proxy
 */
abstract contract DiamondFallback is
    IDiamondFallback,
    _DiamondFallback,
    DiamondBase
{
    /**
     * @inheritdoc IDiamondFallback
     */
    function getFallbackAddress()
        external
        view
        returns (address fallbackAddress)
    {
        fallbackAddress = _getFallbackAddress();
    }

    /**
     * @inheritdoc IDiamondFallback
     */
    function setFallbackAddress(address fallbackAddress) external onlyOwner {
        _setFallbackAddress(fallbackAddress);
    }

    /**
     * @inheritdoc _DiamondFallback
     */
    function _getImplementation()
        internal
        view
        virtual
        override(_Proxy, _DiamondBase, _DiamondFallback)
        returns (address implementation)
    {
        implementation = super._getImplementation();
    }
}
