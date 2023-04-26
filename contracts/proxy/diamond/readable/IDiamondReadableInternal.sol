// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

/**
 * @title Diamond proxy introspection interface needed for internal functions
 * @dev see https://eips.ethereum.org/EIPS/eip-2535
 */
interface IDiamondReadableInternal {
    struct Facet {
        address target;
        bytes4[] selectors;
    }
}
