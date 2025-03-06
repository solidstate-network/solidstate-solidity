// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

/**
 * @title ERC2535 read interface for internal functions
 * @dev see https://eips.ethereum.org/EIPS/eip-2535
 */
interface _IERC2535DiamondLoupe {
    struct Facet {
        address target;
        bytes4[] selectors;
    }
}
