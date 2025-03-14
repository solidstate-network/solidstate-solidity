// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IDiamondProxyExecutable } from '../executable/IDiamondProxyExecutable.sol';
import { _IDiamondProxyFallback } from './_IDiamondProxyFallback.sol';

interface IDiamondProxyFallback is
    _IDiamondProxyFallback,
    IDiamondProxyExecutable
{
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
