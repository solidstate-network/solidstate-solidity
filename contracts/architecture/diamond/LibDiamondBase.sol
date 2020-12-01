// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import '@openzeppelin/contracts/utils/EnumerableSet.sol';

library LibDiamondBase {
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
    mapping (address => EnumerableSet.UintSet) facetSelectors;
    mapping (bytes4 => address) selectorFacet;
  }

  function initialize (FacetCut[] memory cuts) internal {
    for (uint i; i < cuts.length; i++) {
      diamondCut(cuts[i]);
    }
  }

  function diamondCut (FacetCut memory cut) internal {
    Layout storage l = LibDiamondBase.layout();

    address oldFacet = l.selectorFacet[cut.selector];

    l.facetSelectors[oldFacet].remove(uint256(uint32(cut.selector)));

    if (l.facetSelectors[oldFacet].length() == 0) {
      l.facets.remove(oldFacet);
    }

    l.facets.add(cut.facet);
    l.facetSelectors[cut.facet].add(uint256(uint32(cut.selector)));
    l.selectorFacet[cut.selector] = cut.facet;
  }

  function setFallbackAddress (address fallbackAddress) internal {
    require(fallbackAddress != address(this), 'DiamondBase: fallback address cannot be self');
    LibDiamondBase.layout().fallbackAddress = fallbackAddress;
  }

  function layout () internal pure returns (Layout storage l) {
    bytes32 slot = STORAGE_SLOT;
    assembly { l.slot := slot }
  }
}
