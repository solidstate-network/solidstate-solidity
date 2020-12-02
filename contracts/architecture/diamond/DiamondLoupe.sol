// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import '@openzeppelin/contracts/utils/EnumerableSet.sol';

import './LibDiamondBase.sol';

contract DiamondLoupe {
  using EnumerableSet for EnumerableSet.AddressSet;
  using EnumerableSet for EnumerableSet.UintSet;

  function readFacetCuts () external view returns (
    LibDiamondBase.FacetCut[] memory cuts
  ) {
    LibDiamondBase.Layout storage l = LibDiamondBase.layout();
    EnumerableSet.AddressSet storage facets = l.facets;
    cuts = new LibDiamondBase.FacetCut[](l.selectors.length());

    for (uint i; i < facets.length(); i++) {
      address facet = facets.at(i);
      EnumerableSet.UintSet storage facetSelectors = l.facetSelectors[facet];

      for (uint j; j < facetSelectors.length(); j++) {
        cuts[i + j] = LibDiamondBase.FacetCut({
          facet: facet,
          selector: bytes4(uint32(facetSelectors.at(j)))
        });
      }
    }
  }

  function readFacets () external view returns (
    address[] memory facets
  ) {
    EnumerableSet.AddressSet storage allFacets = LibDiamondBase.layout().facets;
    facets = new address[](allFacets.length());

    for (uint i; i < facets.length; i++) {
      facets[i] = allFacets.at(i);
    }
  }

  function readFacetSelectors (
    address facet
  ) external view returns (
    bytes4[] memory selectors
  ) {
    EnumerableSet.UintSet storage facetSelectors = LibDiamondBase.layout().facetSelectors[facet];
    selectors = new bytes4[](facetSelectors.length());

    for (uint i; i < selectors.length; i++) {
      selectors[i] = bytes4(uint32(facetSelectors.at(i)));
    }
  }

  function readSelectorFacet (
    bytes4 selector
  ) external view returns (
    address facet
  ) {
    return LibDiamondBase.layout().selectorFacet[selector];
  }
}
