// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @dev derived from https://github.com/mudgen/diamond-2 (MIT license)
 */
interface IDiamondCut {
  enum FacetCutAction { ADD, REPLACE, REMOVE }

  event DiamondCut (FacetCut[] _diamondCut, address _init, bytes _calldata);

  struct FacetCut {
    address target;
    FacetCutAction action;
    bytes4[] selectors;
  }

  /**
   * @notice update diamond facets and optionally execute arbitrary initialization function
   * @param facetCuts facet addresses, actions, and function selectors
   * @param target initialization function target
   * @param data initialization function call data
   */
  function diamondCut(
    FacetCut[] calldata facetCuts,
    address target,
    bytes calldata data
  ) external;
}
