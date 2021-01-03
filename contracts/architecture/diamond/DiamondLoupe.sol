// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma abicoder v2;

import './DiamondBaseStorage.sol';

contract DiamondLoupe {
  using DiamondBaseStorage for DiamondBaseStorage.Layout;

  function readFacetCuts () external view returns (
    DiamondBaseStorage.FacetCut[] memory cuts
  ) {
    return DiamondBaseStorage.layout().getFacetCuts();
  }

  function readFacets () external view returns (
    address[] memory facets
  ) {
    return DiamondBaseStorage.layout().getFacets();
  }

  function readFacetSelectors (
    address facet
  ) external view returns (
    bytes4[] memory selectors
  ) {
    return DiamondBaseStorage.layout().getFacetSelectors(facet);
  }

  function readSelectorFacet (
    bytes4 selector
  ) external view returns (
    address facet
  ) {
    return DiamondBaseStorage.layout().getSelectorFacet(selector);
  }
}
