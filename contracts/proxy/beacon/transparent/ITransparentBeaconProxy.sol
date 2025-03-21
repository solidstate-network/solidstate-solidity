// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IBeaconProxy } from '../IBeaconProxy.sol';
import { _ITransparentBeaconProxy } from './_ITransparentBeaconProxy.sol';

interface ITransparentBeaconProxy is _ITransparentBeaconProxy, IBeaconProxy {
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
