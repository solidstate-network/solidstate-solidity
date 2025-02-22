// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC20 } from './IERC20.sol';
import { IERC20MetadataStandard } from './IERC20MetadataStandard.sol';
import { IWETHInternal } from './IWETHInternal.sol';

/**
 * @title WETH (Wrapped ETH) interface
 */
interface IWETH is IWETHInternal, IERC20, IERC20MetadataStandard {
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
