// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IDiamondBase } from '../base/IDiamondBase.sol';
import { _IDiamondFallback } from './_IDiamondFallback.sol';

interface IDiamondFallback is _IDiamondFallback, IDiamondBase {
    /**
     * @notice query the address of the fallback implementation
     * @return fallbackAddress address of fallback implementation
     */
    function getFallbackAddress()
        external
        view
        returns (address fallbackAddress);

    /**
     * @notice set the address of the fallback implementation
     * @param fallbackAddress address of fallback implementation
     */
    function setFallbackAddress(address fallbackAddress) external;
}
