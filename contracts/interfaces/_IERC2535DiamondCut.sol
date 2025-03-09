// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC165 } from './_IERC165.sol';

/**
 * @title ERC2535 write interface for internal functions
 * @dev see https://eips.ethereum.org/EIPS/eip-2535
 */
interface _IERC2535DiamondCut is _IERC165 {
    enum FacetCutAction {
        ADD,
        REPLACE,
        REMOVE
    }

    struct FacetCut {
        address target;
        FacetCutAction action;
        bytes4[] selectors;
    }

    event DiamondCut(FacetCut[] facetCuts, address target, bytes data);
}
