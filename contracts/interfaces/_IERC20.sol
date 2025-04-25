// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

/**
 * @title Partial ERC20 interface needed by internal functions
 */
interface _IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}
