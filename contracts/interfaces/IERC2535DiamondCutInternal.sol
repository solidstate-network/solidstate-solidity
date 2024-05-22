// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

/**
 * @title ERC2535 write interface for internal functions
 * @dev see https://eips.ethereum.org/EIPS/eip-2535
 */
interface IERC2535DiamondCutInternal {
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
