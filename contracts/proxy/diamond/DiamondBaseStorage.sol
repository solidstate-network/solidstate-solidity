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
    // maps function selectors to the facets that execute the functions.
    // and maps the selectors to their position in the selectorSlots array.
    // func selector => address facet, selector position
    mapping(bytes4 => bytes32) facets;
    // array of slots of function selectors.
    // each slot holds 8 function selectors.
    mapping(uint256 => bytes32) selectorSlots;
    // The number of function selectors in selectorSlots
    uint16 selectorCount;

    // TODO: fallback address
    address fallbackAddress;
  }

  function layout () internal pure returns (Layout storage l) {
    bytes32 slot = STORAGE_SLOT;
    assembly { l.slot := slot }
  }

  event DiamondCut (IDiamondCuttable.FacetCut[] _diamondCut, address _init, bytes _calldata);

  bytes32 constant CLEAR_ADDRESS_MASK = bytes32(uint256(0xffffffffffffffffffffffff));
  bytes32 constant CLEAR_SELECTOR_MASK = bytes32(uint256(0xffffffff << 224));

  // Internal function version of diamondCut
  // This code is almost the same as the external diamondCut,
  // except it is using 'Facet[] memory _diamondCut' instead of
  // 'Facet[] calldata _diamondCut'.
  // The code is duplicated to prevent copying calldata to memory which
  // causes an error for a two dimensional array.
  function diamondCut(
    Layout storage l,
    IDiamondCuttable.FacetCut[] memory _diamondCut,
    address _init,
    bytes memory _calldata
  ) internal {
    uint256 originalSelectorCount = l.selectorCount;
    uint256 selectorCount = originalSelectorCount;
    bytes32 selectorSlot;

    // Check if last selector slot is not full
    if (selectorCount % 8 > 0) {
      // get last selectorSlot
      selectorSlot = l.selectorSlots[selectorCount / 8];
    }

    // loop through diamond cut
    for (uint256 i; i < _diamondCut.length; i++) {
      (selectorCount, selectorSlot) = l.updateFacetSelectors(
        selectorCount,
        selectorSlot,
        _diamondCut[i].target,
        _diamondCut[i].action,
        _diamondCut[i].selectors
      );
    }

    if (selectorCount != originalSelectorCount) {
      l.selectorCount = uint16(selectorCount);
    }

    // If last selector slot is not full
    if (selectorCount % 8 > 0) {
      l.selectorSlots[selectorCount / 8] = selectorSlot;
    }

    emit DiamondCut(_diamondCut, _init, _calldata);
    initializeDiamondCut(_init, _calldata);
  }

  function updateFacetSelectors(
    Layout storage l,
    uint256 _selectorCount,
    bytes32 _selectorSlot,
    address _newFacetAddress,
    IDiamondCuttable.FacetCutAction _action,
    bytes4[] memory _selectors
  ) internal returns (uint256, bytes32) {
    require(_selectors.length > 0, 'DiamondBase: No selectors in facet to cut');

    if (_action == IDiamondCuttable.FacetCutAction.ADD) {
      return l.addFacetSelectors(_selectorCount, _selectorSlot, _newFacetAddress, _selectors);
    } else if (_action == IDiamondCuttable.FacetCutAction.REPLACE) {
      l.replaceFacetSelectors(_newFacetAddress, _selectors);
      return (_selectorCount, _selectorSlot);
    } else if (_action == IDiamondCuttable.FacetCutAction.REMOVE) {
      return l.removeFacetSelectors(_selectorCount, _selectorSlot, _newFacetAddress, _selectors);
    } else {
      revert('DiamondBase: invalid action');
    }
  }

  function addFacetSelectors (
    Layout storage l,
    uint256 _selectorCount,
    bytes32 _selectorSlot,
    address _newFacetAddress,
    bytes4[] memory _selectors
  ) internal returns (uint256, bytes32) {
    unchecked {
      require(_newFacetAddress != address(0), 'DiamondBase: Add facet cannot be zero address');
      enforceHasContractCode(_newFacetAddress, 'DiamondBase: Add facet has no code');

      for (uint256 selectorIndex; selectorIndex < _selectors.length; selectorIndex++) {
        bytes4 selector = _selectors[selectorIndex];
        bytes32 oldFacet = l.facets[selector];
        require(address(bytes20(oldFacet)) == address(0), 'DiamondBase: cannot add function that already exists');
        // add facet for selector
        l.facets[selector] = bytes20(_newFacetAddress) | bytes32(_selectorCount);
        uint256 selectorInSlotPosition = (_selectorCount % 8) * 32;
        // clear selector position in slot and add selector
        _selectorSlot = (_selectorSlot & ~(CLEAR_SELECTOR_MASK >> selectorInSlotPosition)) | (bytes32(selector) >> selectorInSlotPosition);

        // if slot is full then write it to storage
        if (selectorInSlotPosition == 224) {
          l.selectorSlots[_selectorCount / 8] = _selectorSlot;
          _selectorSlot = 0;
        }

        _selectorCount++;
      }
    }

    return (_selectorCount, _selectorSlot);
  }

  function replaceFacetSelectors (
    Layout storage l,
    address _newFacetAddress,
    bytes4[] memory _selectors
  ) internal {
    require(_newFacetAddress != address(0), 'DiamondBase: Replace facet cannot be zero address');
    enforceHasContractCode(_newFacetAddress, 'DiamondBase: Replace facet has no code');

    for (uint256 selectorIndex; selectorIndex < _selectors.length; selectorIndex++) {
      bytes4 selector = _selectors[selectorIndex];
      bytes32 oldFacet = l.facets[selector];
      address oldFacetAddress = address(bytes20(oldFacet));

      // only useful if immutable functions exist
      require(oldFacetAddress != address(this), 'DiamondBase: cannot replace immutable function');
      require(oldFacetAddress != _newFacetAddress, 'DiamondBase: cannot replace function with same function');
      require(oldFacetAddress != address(0), 'DiamondBase: cannot replace function that does not exist');

      // replace old facet address
      l.facets[selector] = (oldFacet & CLEAR_ADDRESS_MASK) | bytes20(_newFacetAddress);
    }
  }

  function removeFacetSelectors (
    Layout storage l,
    uint256 _selectorCount,
    bytes32 _selectorSlot,
    address _newFacetAddress,
    bytes4[] memory _selectors
  ) internal returns (uint256, bytes32) {
    unchecked {
      require(_newFacetAddress == address(0), 'DiamondBase: Remove facet address must be zero address');
      uint256 selectorSlotCount = _selectorCount / 8;
      uint256 selectorInSlotIndex = (_selectorCount % 8) - 1;

      for (uint256 selectorIndex; selectorIndex < _selectors.length; selectorIndex++) {
        if (_selectorSlot == 0) {
          // get last selectorSlot
          selectorSlotCount--;
          _selectorSlot = l.selectorSlots[selectorSlotCount];
          selectorInSlotIndex = 7;
        }

        bytes4 lastSelector;
        uint256 oldSelectorsSlotCount;
        uint256 oldSelectorInSlotPosition;

        // adding a block here prevents stack too deep error
        {
          bytes4 selector = _selectors[selectorIndex];
          bytes32 oldFacet = l.facets[selector];

          require(address(bytes20(oldFacet)) != address(0), 'DiamondBase: cannot remove function that does not exist');
          // only useful if immutable functions exist
          require(address(bytes20(oldFacet)) != address(this), 'DiamondBase: cannot remove immutable function');
          // replace selector with last selector in l.facets
          // gets the last selector
          lastSelector = bytes4(_selectorSlot << (selectorInSlotIndex * 32));

          if (lastSelector != selector) {
            // update last selector slot position info
            l.facets[lastSelector] = (oldFacet & CLEAR_ADDRESS_MASK) | bytes20(l.facets[lastSelector]);
          }

          delete l.facets[selector];
          uint256 oldSelectorCount = uint16(uint256(oldFacet));
          oldSelectorsSlotCount = oldSelectorCount / 8;
          oldSelectorInSlotPosition = (oldSelectorCount % 8) * 32;
        }

        if (oldSelectorsSlotCount != selectorSlotCount) {
          bytes32 oldSelectorSlot = l.selectorSlots[oldSelectorsSlotCount];

          // clears the selector we are deleting and puts the last selector in its place.
          oldSelectorSlot =
          (oldSelectorSlot & ~(CLEAR_SELECTOR_MASK >> oldSelectorInSlotPosition)) |
          (bytes32(lastSelector) >> oldSelectorInSlotPosition);

          // update storage with the modified slot
          l.selectorSlots[oldSelectorsSlotCount] = oldSelectorSlot;
        } else {
          // clears the selector we are deleting and puts the last selector in its place.
          _selectorSlot =
          (_selectorSlot & ~(CLEAR_SELECTOR_MASK >> oldSelectorInSlotPosition)) |
          (bytes32(lastSelector) >> oldSelectorInSlotPosition);
        }

        if (selectorInSlotIndex == 0) {
          delete l.selectorSlots[selectorSlotCount];
          _selectorSlot = 0;
        }

        selectorInSlotIndex--;
      }

      _selectorCount = selectorSlotCount * 8 + selectorInSlotIndex + 1;

      return (_selectorCount, _selectorSlot);
    }
  }

  function initializeDiamondCut (
    address target,
    bytes memory data
  ) internal {
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

  function enforceHasContractCode(
    address target,
    string memory errorMessage
  ) private view {
    uint256 size;
    assembly { size := extcodesize(target) }
    require(size > 0, errorMessage);
  }
}
