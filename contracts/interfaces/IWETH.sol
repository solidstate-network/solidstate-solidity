// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC20Metadata } from '../token/ERC20/metadata/IERC20Metadata.sol';
import { IERC20 } from './IERC20.sol';

/**
 * @title WETH (Wrapped ETH) interface
 */
interface IWETH is IERC20, IERC20Metadata {
    /**
     * @notice convert ETH to WETH
     */
    function deposit() external payable;

    /**
     * @notice convert WETH to ETH
     * @dev if caller is a contract, it should have a fallback or receive function
     * @param amount quantity of WETH to convert, denominated in wei
     */
    function withdraw(uint256 amount) external;
}
