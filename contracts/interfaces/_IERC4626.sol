// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IERC20 } from './_IERC20.sol';
import { _IERC20Metadata } from './_IERC20Metadata.sol';

/**
 * @title Partial ERC4626 interface needed by internal functions
 */
interface _IERC4626 is _IERC20, _IERC20Metadata {
    event Deposit(
        address indexed caller,
        address indexed owner,
        uint256 assets,
        uint256 shares
    );

    event Withdraw(
        address indexed caller,
        address indexed receiver,
        address indexed owner,
        uint256 assets,
        uint256 shares
    );
}
