// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _Ownable } from '../../../access/ownable/_Ownable.sol';
import { _DiamondBase } from '../base/_DiamondBase.sol';
import { DiamondBaseStorage } from '../base/DiamondBaseStorage.sol';
import { _IDiamondFallback } from './_IDiamondFallback.sol';

abstract contract _DiamondFallback is
    _IDiamondFallback,
    _DiamondBase,
    _Ownable
{
    /**
     * @inheritdoc _DiamondBase
     * @notice query custom fallback address is no implementation is found
     */
    function _getImplementation()
        internal
        view
        virtual
        override
        returns (address implementation)
    {
        implementation = super._getImplementation();

        if (implementation == address(0)) {
            implementation = _getFallbackAddress();
        }
    }

    /**
     * @notice query the address of the fallback implementation
     * @return fallbackAddress address of fallback implementation
     */
    function _getFallbackAddress()
        internal
        view
        virtual
        returns (address fallbackAddress)
    {
        fallbackAddress = DiamondBaseStorage
            .layout(DiamondBaseStorage.DEFAULT_STORAGE_SLOT)
            .fallbackAddress;
    }

    /**
     * @notice set the address of the fallback implementation
     * @param fallbackAddress address of fallback implementation
     */
    function _setFallbackAddress(address fallbackAddress) internal virtual {
        DiamondBaseStorage
            .layout(DiamondBaseStorage.DEFAULT_STORAGE_SLOT)
            .fallbackAddress = fallbackAddress;
    }
}
