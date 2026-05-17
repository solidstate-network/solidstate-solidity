// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { IERC1967Proxy } from '../interfaces/IERC1967Proxy.sol';
import { IContext } from '../meta/IContext.sol';
import { _IProxy } from './_IProxy.sol';

interface IProxy is _IProxy, IContext, IERC1967Proxy {
    /**
     * @notice delegate calls to EIP-1967 implementation contract
     */
    fallback() external payable;

    receive() external payable;
}
