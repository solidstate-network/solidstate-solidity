// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './DiamondBaseStorage.sol';
import './IDiamondLoupe.sol';

/**
 * @title EIP-2535 "Diamond" proxy introspection contract
 * @dev derived from https://github.com/mudgen/diamond-2 (MIT license)
 */
contract DiamondLoupe is IDiamondLoupe {
  /**
   * @inheritdoc IDiamondLoupe
   */
  function facets () external override view returns (Facet[] memory facets_) {
    DiamondBaseStorage.Layout storage l = DiamondBaseStorage.layout();

    facets_ = new Facet[](l.selectorCount);

    uint8[] memory numFacetSelectors = new uint8[](l.selectorCount);
    uint256 numFacets;
    uint256 selectorIndex;

    // loop through function selectors
    for (uint256 slotIndex; selectorIndex < l.selectorCount; slotIndex++) {
      bytes32 slot = l.selectorSlots[slotIndex];

      for (uint256 selectorSlotIndex; selectorSlotIndex < 8; selectorSlotIndex++) {
        selectorIndex++;

        if (selectorIndex > l.selectorCount) {
          break;
        }

        bytes4 selector = bytes4(slot << (selectorSlotIndex * 32));
        address facetAddress_ = address(bytes20(l.facets[selector]));
        bool continueLoop = false;

        for (uint256 facetIndex; facetIndex < numFacets; facetIndex++) {
          if (facets_[facetIndex].facetAddress == facetAddress_) {
            facets_[facetIndex].functionSelectors[numFacetSelectors[facetIndex]] = selector;
            // probably will never have more than 256 functions from one facet contract
            require(numFacetSelectors[facetIndex] < 255);
            numFacetSelectors[facetIndex]++;
            continueLoop = true;
            break;
          }
        }

        if (continueLoop) {
          continueLoop = false;
          continue;
        }

        facets_[numFacets].facetAddress = facetAddress_;
        facets_[numFacets].functionSelectors = new bytes4[](l.selectorCount);
        facets_[numFacets].functionSelectors[0] = selector;
        numFacetSelectors[numFacets] = 1;
        numFacets++;
      }
    }

    for (uint256 facetIndex; facetIndex < numFacets; facetIndex++) {
      uint256 numSelectors = numFacetSelectors[facetIndex];
      bytes4[] memory selectors = facets_[facetIndex].functionSelectors;

      // setting the number of selectors
      assembly { mstore(selectors, numSelectors) }
    }

    // setting the number of facets
    assembly { mstore(facets_, numFacets) }
  }

  /**
   * @inheritdoc IDiamondLoupe
   */
  function facetFunctionSelectors (
    address _facet
  ) external override view returns (bytes4[] memory _facetFunctionSelectors) {
    DiamondBaseStorage.Layout storage l = DiamondBaseStorage.layout();

    _facetFunctionSelectors = new bytes4[](l.selectorCount);

    uint256 numSelectors;
    uint256 selectorIndex;

    // loop through function selectors
    for (uint256 slotIndex; selectorIndex < l.selectorCount; slotIndex++) {
      bytes32 slot = l.selectorSlots[slotIndex];

      for (uint256 selectorSlotIndex; selectorSlotIndex < 8; selectorSlotIndex++) {
        selectorIndex++;

        if (selectorIndex > l.selectorCount) {
          break;
        }

        bytes4 selector = bytes4(slot << (selectorSlotIndex * 32));
        address facet = address(bytes20(l.facets[selector]));

        if (_facet == facet) {
          _facetFunctionSelectors[numSelectors] = selector;
          numSelectors++;
        }
      }
    }

    // set the number of selectors in the array
    assembly { mstore(_facetFunctionSelectors, numSelectors) }
  }

  /**
   * @inheritdoc IDiamondLoupe
   */
  function facetAddresses () external override view returns (address[] memory facetAddresses_) {
    DiamondBaseStorage.Layout storage l = DiamondBaseStorage.layout();

    facetAddresses_ = new address[](l.selectorCount);
    uint256 numFacets;
    uint256 selectorIndex;

    for (uint256 slotIndex; selectorIndex < l.selectorCount; slotIndex++) {
      bytes32 slot = l.selectorSlots[slotIndex];

      for (uint256 selectorSlotIndex; selectorSlotIndex < 8; selectorSlotIndex++) {
        selectorIndex++;

        if (selectorIndex > l.selectorCount) {
          break;
        }

        bytes4 selector = bytes4(slot << (selectorSlotIndex * 32));
        address facetAddress_ = address(bytes20(l.facets[selector]));
        bool continueLoop = false;

        for (uint256 facetIndex; facetIndex < numFacets; facetIndex++) {
          if (facetAddress_ == facetAddresses_[facetIndex]) {
            continueLoop = true;
            break;
          }
        }

        if (continueLoop) {
          continueLoop = false;
          continue;
        }

        facetAddresses_[numFacets] = facetAddress_;
        numFacets++;
      }
    }

    // set the number of facet addresses in the array
    assembly { mstore(facetAddresses_, numFacets) }
  }

  /**
   * @inheritdoc IDiamondLoupe
   */
  function facetAddress (
    bytes4 selector
  ) external override view returns (address facetAddress_) {
    facetAddress_ = address(bytes20(
      DiamondBaseStorage.layout().facets[selector]
    ));
  }
}
