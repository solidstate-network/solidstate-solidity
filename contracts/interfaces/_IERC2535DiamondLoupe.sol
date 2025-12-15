// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { _IERC165 } from './_IERC165.sol';

/**
 * @title ERC2535 read interface for internal functions
 * @dev see https://eips.ethereum.org/EIPS/eip-2535
 */
interface _IERC2535DiamondLoupe is _IERC165 {
    struct Facet {
        address target;
        bytes4[] selectors;
    }
}
