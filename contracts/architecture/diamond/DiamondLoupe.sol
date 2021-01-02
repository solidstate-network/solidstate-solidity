// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma abicoder v2;

import './LibDiamondBase.sol';

contract DiamondLoupe {
  using LibDiamondBase for LibDiamondBase.Layout;

  function readFacetCuts () external view returns (
    LibDiamondBase.FacetCut[] memory cuts
  ) {
    return LibDiamondBase.layout().getFacetCuts();
  }

  function readFacets () external view returns (
    address[] memory facets
  ) {
    return LibDiamondBase.layout().getFacets();
  }

  function readFacetSelectors (
    address facet
  ) external view returns (
    bytes4[] memory selectors
  ) {
    return LibDiamondBase.layout().getFacetSelectors(facet);
  }

  function readSelectorFacet (
    bytes4 selector
  ) external view returns (
    address facet
  ) {
    return LibDiamondBase.layout().getSelectorFacet(selector);
  }
}
