// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ProxyInternal } from '../../ProxyInternal.sol';
import { DiamondBase } from '../base/DiamondBase.sol';
import { DiamondBaseInternal } from '../base/DiamondBaseInternal.sol';
import { DiamondBaseStorage } from '../base/DiamondBaseStorage.sol';
import { IDiamondFallback } from './IDiamondFallback.sol';
import { DiamondFallbackInternal } from './DiamondFallbackInternal.sol';

/**
 * @title Fallback feature for EIP-2535 "Diamond" proxy
 */
abstract contract DiamondFallback is
    IDiamondFallback,
    DiamondFallbackInternal,
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
     * @inheritdoc DiamondFallbackInternal
     */
    function _getImplementation()
        internal
        view
        virtual
        override(ProxyInternal, DiamondBaseInternal, DiamondFallbackInternal)
        returns (address implementation)
    {
        implementation = super._getImplementation();
    }
}
