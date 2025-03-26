// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IERC5313 } from './_IERC5313.sol';

/**
 * @title Partial ERC173 interface needed by internal functions
 */
interface _IERC173 is _IERC5313 {
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );
}
