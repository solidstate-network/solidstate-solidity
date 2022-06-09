// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @title Diamond proxy upgrade interface
 * @dev see https://eips.ethereum.org/EIPS/eip-2535
 */
interface IDiamondWritable {
    enum FacetCutAction {
        ADD,
        REPLACE,
        REMOVE
    }

    event DiamondCut(FacetCut[] facetCuts, address target, bytes data);

    struct FacetCut {
        address target;
        FacetCutAction action;
        bytes4[] selectors;
    }

    /**
     * @notice update diamond facets and optionally execute arbitrary initialization function
     * @param facetCuts array of structured Diamond facet update data
     * @param target optional target of initialization delegatecall
     * @param data optional initialization function call data
     */
    function diamondCut(
        FacetCut[] calldata facetCuts,
        address target,
        bytes calldata data
    ) external;
}
