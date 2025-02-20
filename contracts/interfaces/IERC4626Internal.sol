// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

/**
 * @title Partial ERC4626 interface needed by internal functions
 */
interface IERC4626Internal {
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
