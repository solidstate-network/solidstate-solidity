// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './IDiamondCuttable.sol';

/**
 * @dev derived from https://github.com/mudgen/diamond-2 (MIT license)
 */
library DiamondBaseStorage {
  using DiamondBaseStorage for DiamondBaseStorage.Layout;

  bytes32 internal constant STORAGE_SLOT = keccak256(
    'solidstate.contracts.storage.DiamondBase'
  );

  struct Layout {
    // function selector => (facet address, selector slot position)
    mapping (bytes4 => bytes32) facets;
    // array of selector slots with 8 selectors per slot
    mapping (uint256 => bytes32) selectorSlots;
    uint16 selectorCount;
    // TODO: fallback address
    address fallbackAddress;
  }

  function layout () internal pure returns (Layout storage l) {
    bytes32 slot = STORAGE_SLOT;
    assembly { l.slot := slot }
  }

  event DiamondCut (IDiamondCuttable.FacetCut[] facetCuts, address target, bytes data);

  bytes32 constant CLEAR_ADDRESS_MASK = bytes32(uint256(0xffffffffffffffffffffffff));
  bytes32 constant CLEAR_SELECTOR_MASK = bytes32(uint256(0xffffffff << 224));

  /**
   * @notice update functions callable on Diamond proxy
   * @param l storage layout
   * @param facetCuts array of structured Diamond facet update data
   * @param target optional recipient of initialization delegatecall
   * @param data optional initialization call data
   */
  function diamondCut(
    Layout storage l,
    IDiamondCuttable.FacetCut[] memory facetCuts,
    address target,
    bytes memory data
  ) internal {
    uint256 originalSelectorCount = l.selectorCount;
    uint256 selectorCount = originalSelectorCount;
    bytes32 selectorSlot;

    // Check if last selector slot is not full
    if (selectorCount % 8 > 0) {
      // get last selectorSlot
      selectorSlot = l.selectorSlots[selectorCount / 8];
    }

    for (uint256 i; i < facetCuts.length; i++) {
      IDiamondCuttable.FacetCut memory facetCut = facetCuts[i];
      IDiamondCuttable.FacetCutAction action = facetCut.action;

      require(
        facetCut.selectors.length > 0,
        'DiamondBase: No selectors in facet to cut'
      );

      if (action == IDiamondCuttable.FacetCutAction.ADD) {
        (selectorCount, selectorSlot) = l.addFacetSelectors(
          selectorCount,
          selectorSlot,
          facetCut
        );
      } else if (action == IDiamondCuttable.FacetCutAction.REPLACE) {
        l.replaceFacetSelectors(facetCut);
      } else if (action == IDiamondCuttable.FacetCutAction.REMOVE) {
        (selectorCount, selectorSlot) = l.removeFacetSelectors(
          selectorCount,
          selectorSlot,
          facetCut
        );
      } else {
        revert('DiamondBase: invalid action');
      }
    }

    if (selectorCount != originalSelectorCount) {
      l.selectorCount = uint16(selectorCount);
    }

    // If last selector slot is not full
    if (selectorCount % 8 > 0) {
      l.selectorSlots[selectorCount / 8] = selectorSlot;
    }

    emit DiamondCut(facetCuts, target, data);
    initialize(target, data);
  }

  function addFacetSelectors (
    Layout storage l,
    uint256 selectorCount,
    bytes32 selectorSlot,
    IDiamondCuttable.FacetCut memory facetCut
  ) internal returns (uint256, bytes32) {
    unchecked {
      require(
        facetCut.target != address(0),
        'DiamondBase: Add facet cannot be zero address'
      );

      enforceHasContractCode(facetCut.target, 'DiamondBase: Add facet has no code');

      for (uint256 selectorIndex; selectorIndex < facetCut.selectors.length; selectorIndex++) {
        bytes4 selector = facetCut.selectors[selectorIndex];
        bytes32 oldFacet = l.facets[selector];

        require(
          address(bytes20(oldFacet)) == address(0),
          'DiamondBase: cannot add function that already exists'
        );

        // add facet for selector
        l.facets[selector] = bytes20(facetCut.target) | bytes32(selectorCount);
        uint256 selectorInSlotPosition = (selectorCount % 8) * 32;

        // clear selector position in slot and add selector
        selectorSlot = (
          selectorSlot & ~(CLEAR_SELECTOR_MASK >> selectorInSlotPosition)
        ) | (bytes32(selector) >> selectorInSlotPosition);

        // if slot is full then write it to storage
        if (selectorInSlotPosition == 224) {
          l.selectorSlots[selectorCount / 8] = selectorSlot;
          selectorSlot = 0;
        }

        selectorCount++;
      }

      return (selectorCount, selectorSlot);
    }
  }

  function replaceFacetSelectors (
    Layout storage l,
    IDiamondCuttable.FacetCut memory facetCut
  ) internal {
    require(
      facetCut.target != address(0),
      'DiamondBase: Replace facet cannot be zero address'
    );

    enforceHasContractCode(facetCut.target, 'DiamondBase: Replace facet has no code');

    for (uint256 selectorIndex; selectorIndex < facetCut.selectors.length; selectorIndex++) {
      bytes4 selector = facetCut.selectors[selectorIndex];
      bytes32 oldFacet = l.facets[selector];
      address oldFacetAddress = address(bytes20(oldFacet));

      require(
        oldFacetAddress != address(0),
        'DiamondBase: cannot replace function that does not exist'
      );

      // only useful if immutable functions exist
      require(
        oldFacetAddress != address(this),
        'DiamondBase: cannot replace immutable function'
      );

      require(
        oldFacetAddress != facetCut.target,
        'DiamondBase: cannot replace function with same function'
      );

      // replace old facet address
      l.facets[selector] = (oldFacet & CLEAR_ADDRESS_MASK) | bytes20(facetCut.target);
    }
  }

  function removeFacetSelectors (
    Layout storage l,
    uint256 selectorCount,
    bytes32 selectorSlot,
    IDiamondCuttable.FacetCut memory facetCut
  ) internal returns (uint256, bytes32) {
    require(
      facetCut.target == address(0),
      'DiamondBase: Remove facet address must be zero address'
    );

    uint256 selectorSlotCount = selectorCount / 8;
    uint256 selectorInSlotIndex = selectorCount % 8;

    for (uint256 selectorIndex; selectorIndex < facetCut.selectors.length; selectorIndex++) {
      if (selectorSlot == 0) {
        // get last selectorSlot
        selectorSlotCount--;
        selectorSlot = l.selectorSlots[selectorSlotCount];
        selectorInSlotIndex = 7;
      } else {
        selectorInSlotIndex--;
      }

      bytes4 lastSelector;
      uint256 oldSelectorsSlotCount;
      uint256 oldSelectorInSlotPosition;

      // adding a block here prevents stack too deep error
      {
        bytes4 selector = facetCut.selectors[selectorIndex];
        bytes32 oldFacet = l.facets[selector];

        require(
          address(bytes20(oldFacet)) != address(0),
          'DiamondBase: cannot remove function that does not exist'
        );

        // only useful if immutable functions exist
        require(
          address(bytes20(oldFacet)) != address(this),
          'DiamondBase: cannot remove immutable function'
        );

        // replace selector with last selector in l.facets
        lastSelector = bytes4(selectorSlot << (selectorInSlotIndex * 32));

        if (lastSelector != selector) {
          // update last selector slot position info
          l.facets[lastSelector] = (
            oldFacet & CLEAR_ADDRESS_MASK
          ) | bytes20(l.facets[lastSelector]);
        }

        delete l.facets[selector];
        uint256 oldSelectorCount = uint16(uint256(oldFacet));
        oldSelectorsSlotCount = oldSelectorCount / 8;
        oldSelectorInSlotPosition = (oldSelectorCount % 8) * 32;
      }

      if (oldSelectorsSlotCount != selectorSlotCount) {
        bytes32 oldSelectorSlot = l.selectorSlots[oldSelectorsSlotCount];

        // clears the selector we are deleting and puts the last selector in its place.
        oldSelectorSlot = (
          oldSelectorSlot & ~(CLEAR_SELECTOR_MASK >> oldSelectorInSlotPosition)
        ) | (bytes32(lastSelector) >> oldSelectorInSlotPosition);

        // update storage with the modified slot
        l.selectorSlots[oldSelectorsSlotCount] = oldSelectorSlot;
      } else {
        // clears the selector we are deleting and puts the last selector in its place.
        selectorSlot = (
          selectorSlot & ~(CLEAR_SELECTOR_MASK >> oldSelectorInSlotPosition)
        ) | (bytes32(lastSelector) >> oldSelectorInSlotPosition);
      }

      if (selectorInSlotIndex == 0) {
        delete l.selectorSlots[selectorSlotCount];
        selectorSlot = 0;
      }
    }

    selectorCount = selectorSlotCount * 8 + selectorInSlotIndex;

    return (selectorCount, selectorSlot);
  }

  function initialize (
    address target,
    bytes memory data
  ) private {
    require(
      (target == address(0)) == (data.length == 0),
      'DiamondBase: invalid initialization parameters'
    );

    if (target != address(0)) {
      if (target != address(this)) {
        enforceHasContractCode(target, 'DiamondBase: target address has no code');
      }

      (bool success, bytes memory error) = target.delegatecall(data);

      if (!success) {
        if (error.length > 0) {
          // bubble up the error
          revert(string(error));
        } else {
          revert('DiamondBase: initialization function reverted');
        }
      }
    }
  }

  function enforceHasContractCode (
    address target,
    string memory errorMessage
  ) private view {
    uint256 size;
    assembly { size := extcodesize(target) }
    require(size > 0, errorMessage);
  }
}
