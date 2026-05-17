// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { _ITransparentProxyWithAdminFunctions } from './_ITransparentProxyWithAdminFunctions.sol';
import { ITransparentProxy } from './ITransparentProxy.sol';

/**
 * @title Utility interface for TransparentProxy which provides access to transparent admin functions
 */
interface ITransparentProxyWithAdminFunctions is
    _ITransparentProxyWithAdminFunctions,
    ITransparentProxy
{
    /**
     * @notice update the EIP-1967 proxy admin
     * @param admin address of admin account
     */
    function setProxyAdmin(address admin) external;

    /**
     * @notice update the EIP-1967 logic implementation address
     * @param implementation address of implementation contract
     */
    function setImplementation(address implementation) external;
}
