// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

/**
 * @title Partial ERC173 interface needed by internal functions
 */
interface _IERC173 {
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );
}
