// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ITransparentBeaconProxy } from './ITransparentBeaconProxy.sol';
import { _ITransparentBeaconProxyWithAdminFunctions } from './_ITransparentBeaconProxyWithAdminFunctions.sol';

/**
 * @title Utility interface for TransparentBeaconProxy which provides access to transparent admin functions
 */
interface ITransparentBeaconProxyWithAdminFunctions is
    _ITransparentBeaconProxyWithAdminFunctions,
    ITransparentBeaconProxy
{
    /**
     * @notice update the EIP-1967 proxy admin
     * @param admin address of admin account
     */
    function setAdmin(address admin) external;

    /**
     * @notice update the EIP-1967 beacon address
     * @param beacon beacon contract address
     */
    function setBeacon(address beacon) external;
}
