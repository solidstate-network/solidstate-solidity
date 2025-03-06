// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC2535DiamondCut } from './_IERC2535DiamondCut.sol';

/**
 * @title ERC2535 write interface
 * @dev see https://eips.ethereum.org/EIPS/eip-2535
 */
interface IERC2535DiamondCut is _IERC2535DiamondCut {
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
