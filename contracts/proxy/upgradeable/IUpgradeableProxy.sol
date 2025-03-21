// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IProxy } from '../IProxy.sol';
import { _IUpgradeableProxy } from './_IUpgradeableProxy.sol';

interface IUpgradeableProxy is _IUpgradeableProxy, IProxy {
    /**
     * @notice update the EIP-1967 proxy admin
     * @param admin address of admin account
     */
    function setAdmin(address admin) external;

    /**
     * @notice update the EIP-1967 logic implementation address
     * @param implementation address of implementation contract
     */
    function setImplementation(address implementation) external;
}
