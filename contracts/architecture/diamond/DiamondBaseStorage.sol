// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import '@openzeppelin/contracts/utils/EnumerableSet.sol';

library DiamondBaseStorage {
  using EnumerableSet for EnumerableSet.AddressSet;
  using EnumerableSet for EnumerableSet.UintSet;

  bytes32 internal constant STORAGE_SLOT = keccak256(
    'solidstate.contracts.storage.DiamondBase'
  );

  struct FacetCut {
    // TODO: use standard
    address facet;
    bytes4 selector;
  }

  struct Layout {
    address fallbackAddress;
    EnumerableSet.AddressSet facets;
    EnumerableSet.UintSet selectors;
    mapping (address => EnumerableSet.UintSet) facetSelectors;
    mapping (bytes4 => address) selectorFacet;
  }

  function layout () internal pure returns (Layout storage l) {
    bytes32 slot = STORAGE_SLOT;
    assembly { l.slot := slot }
  }

  function diamondCut (
    Layout storage l,
    FacetCut[] memory cuts
  ) internal {
    for (uint i; i < cuts.length; i++) {
      diamondCut(l, cuts[i]);
    }
  }

  function diamondCut (
    Layout storage l,
    FacetCut memory cut
  ) internal {
    address oldFacet = l.selectorFacet[cut.selector];

    l.facetSelectors[oldFacet].remove(uint256(uint32(cut.selector)));

    if (cut.facet == address(0)) {
      l.selectors.remove(uint256(uint32(cut.selector)));
    } else {
      l.selectors.add(uint256(uint32(cut.selector)));
    }

    if (l.facetSelectors[oldFacet].length() == 0) {
      l.facets.remove(oldFacet);
    }

    l.facets.add(cut.facet);
    l.facetSelectors[cut.facet].add(uint256(uint32(cut.selector)));
    l.selectorFacet[cut.selector] = cut.facet;
  }

  function setFallbackAddress (
    Layout storage l,
    address fallbackAddress
  ) internal {
    require(
      fallbackAddress != address(this),
      'DiamondBase: fallback address cannot be self'
    );
    l.fallbackAddress = fallbackAddress;
  }

  function getFacetCuts (
    Layout storage l
  ) internal view returns (FacetCut[] memory cuts) {
    EnumerableSet.AddressSet storage facets = l.facets;
    cuts = new DiamondBaseStorage.FacetCut[](l.selectors.length());

    for (uint i; i < facets.length(); i++) {
      address facet = facets.at(i);
      EnumerableSet.UintSet storage facetSelectors = l.facetSelectors[facet];

      for (uint j; j < facetSelectors.length(); j++) {
        cuts[i + j] = DiamondBaseStorage.FacetCut({
          facet: facet,
          selector: bytes4(uint32(facetSelectors.at(j)))
        });
      }
    }
  }

  function getFacets (
    Layout storage l
  ) internal view returns (address[] memory facets) {
    EnumerableSet.AddressSet storage allFacets = l.facets;
    facets = new address[](allFacets.length());

    for (uint i; i < facets.length; i++) {
      facets[i] = allFacets.at(i);
    }
  }

  function getFacetSelectors (
    Layout storage l,
    address facet
  ) internal view returns (bytes4[] memory selectors) {
    EnumerableSet.UintSet storage facetSelectors = l.facetSelectors[facet];
    selectors = new bytes4[](facetSelectors.length());

    for (uint i; i < selectors.length; i++) {
      selectors[i] = bytes4(uint32(facetSelectors.at(i)));
    }
  }

  function getSelectorFacet (
    Layout storage l,
    bytes4 selector
  ) internal view returns (address) {
    return l.selectorFacet[selector];
  }
}
