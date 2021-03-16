// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './IDiamondCuttable.sol';

/**
 * @dev derived from https://github.com/mudgen/diamond-2 (MIT license)
 */
library DiamondBaseStorage {
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
    // Used to query if a contract implements an interface.
    // Used to implement ERC-165.
    mapping(bytes4 => bool) supportedInterfaces;

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
    IDiamondCuttable.FacetCut[] memory _diamondCut,
    address _init,
    bytes memory _calldata
  ) internal {
    Layout storage ds = layout();
    uint256 originalSelectorCount = ds.selectorCount;
    uint256 selectorCount = originalSelectorCount;
    bytes32 selectorSlot;
    // Check if last selector slot is not full
    if (selectorCount % 8 > 0) {
      // get last selectorSlot
      selectorSlot = ds.selectorSlots[selectorCount / 8];
    }
    // loop through diamond cut
    for (uint256 facetIndex; facetIndex < _diamondCut.length; facetIndex++) {
      (selectorCount, selectorSlot) = addReplaceRemoveFacetSelectors(
        selectorCount,
        selectorSlot,
        _diamondCut[facetIndex].target,
        _diamondCut[facetIndex].action,
        _diamondCut[facetIndex].selectors
      );
    }
    if (selectorCount != originalSelectorCount) {
      ds.selectorCount = uint16(selectorCount);
    }
    // If last selector slot is not full
    if (selectorCount % 8 > 0) {
      ds.selectorSlots[selectorCount / 8] = selectorSlot;
    }
    emit DiamondCut(_diamondCut, _init, _calldata);
    initializeDiamondCut(_init, _calldata);
  }

  function addReplaceRemoveFacetSelectors(
    uint256 _selectorCount,
    bytes32 _selectorSlot,
    address _newFacetAddress,
    IDiamondCuttable.FacetCutAction _action,
    bytes4[] memory _selectors
  ) internal returns (uint256, bytes32) {
    Layout storage ds = layout();
    require(_selectors.length > 0, 'LibDiamondCut: No selectors in facet to cut');
    if (_action == IDiamondCuttable.FacetCutAction.ADD) {
      require(_newFacetAddress != address(0), 'LibDiamondCut: Add facet cannot be address(0)');
      enforceHasContractCode(_newFacetAddress, 'LibDiamondCut: Add facet has no code');
      for (uint256 selectorIndex; selectorIndex < _selectors.length; selectorIndex++) {
        bytes4 selector = _selectors[selectorIndex];
        bytes32 oldFacet = ds.facets[selector];
        require(address(bytes20(oldFacet)) == address(0), 'LibDiamondCut: cannot add function that already exists');
        // add facet for selector
        ds.facets[selector] = bytes20(_newFacetAddress) | bytes32(_selectorCount);
        uint256 selectorInSlotPosition = (_selectorCount % 8) * 32;
        // clear selector position in slot and add selector
        _selectorSlot = (_selectorSlot & ~(CLEAR_SELECTOR_MASK >> selectorInSlotPosition)) | (bytes32(selector) >> selectorInSlotPosition);
        // if slot is full then write it to storage
        if (selectorInSlotPosition == 224) {
          ds.selectorSlots[_selectorCount / 8] = _selectorSlot;
          _selectorSlot = 0;
        }
        _selectorCount++;
      }
    } else if (_action == IDiamondCuttable.FacetCutAction.REPLACE) {
      require(_newFacetAddress != address(0), 'LibDiamondCut: Replace facet cannot be address(0)');
      enforceHasContractCode(_newFacetAddress, 'LibDiamondCut: Replace facet has no code');
      for (uint256 selectorIndex; selectorIndex < _selectors.length; selectorIndex++) {
        bytes4 selector = _selectors[selectorIndex];
        bytes32 oldFacet = ds.facets[selector];
        address oldFacetAddress = address(bytes20(oldFacet));
        // only useful if immutable functions exist
        require(oldFacetAddress != address(this), 'LibDiamondCut: cannot replace immutable function');
        require(oldFacetAddress != _newFacetAddress, 'LibDiamondCut: cannot replace function with same function');
        require(oldFacetAddress != address(0), 'LibDiamondCut: cannot replace function that does not exist');
        // replace old facet address
        ds.facets[selector] = (oldFacet & CLEAR_ADDRESS_MASK) | bytes20(_newFacetAddress);
      }
    } else if (_action == IDiamondCuttable.FacetCutAction.REMOVE) {
      require(_newFacetAddress == address(0), 'LibDiamondCut: Remove facet address must be address(0)');
      uint256 selectorSlotCount = _selectorCount / 8;
      uint256 selectorInSlotIndex = (_selectorCount % 8) - 1;
      for (uint256 selectorIndex; selectorIndex < _selectors.length; selectorIndex++) {
        if (_selectorSlot == 0) {
          // get last selectorSlot
          selectorSlotCount--;
          _selectorSlot = ds.selectorSlots[selectorSlotCount];
          selectorInSlotIndex = 7;
        }
        bytes4 lastSelector;
        uint256 oldSelectorsSlotCount;
        uint256 oldSelectorInSlotPosition;
        // adding a block here prevents stack too deep error
        {
          bytes4 selector = _selectors[selectorIndex];
          bytes32 oldFacet = ds.facets[selector];
          require(address(bytes20(oldFacet)) != address(0), 'LibDiamondCut: cannot remove function that does not exist');
          // only useful if immutable functions exist
          require(address(bytes20(oldFacet)) != address(this), 'LibDiamondCut: cannot remove immutable function');
          // replace selector with last selector in ds.facets
          // gets the last selector
          lastSelector = bytes4(_selectorSlot << (selectorInSlotIndex * 32));
          if (lastSelector != selector) {
            // update last selector slot position info
            ds.facets[lastSelector] = (oldFacet & CLEAR_ADDRESS_MASK) | bytes20(ds.facets[lastSelector]);
          }
          delete ds.facets[selector];
          uint256 oldSelectorCount = uint16(uint256(oldFacet));
          oldSelectorsSlotCount = oldSelectorCount / 8;
          oldSelectorInSlotPosition = (oldSelectorCount % 8) * 32;
        }
        if (oldSelectorsSlotCount != selectorSlotCount) {
          bytes32 oldSelectorSlot = ds.selectorSlots[oldSelectorsSlotCount];
          // clears the selector we are deleting and puts the last selector in its place.
          oldSelectorSlot =
          (oldSelectorSlot & ~(CLEAR_SELECTOR_MASK >> oldSelectorInSlotPosition)) |
          (bytes32(lastSelector) >> oldSelectorInSlotPosition);
          // update storage with the modified slot
          ds.selectorSlots[oldSelectorsSlotCount] = oldSelectorSlot;
        } else {
          // clears the selector we are deleting and puts the last selector in its place.
          _selectorSlot =
          (_selectorSlot & ~(CLEAR_SELECTOR_MASK >> oldSelectorInSlotPosition)) |
          (bytes32(lastSelector) >> oldSelectorInSlotPosition);
        }
        if (selectorInSlotIndex == 0) {
          delete ds.selectorSlots[selectorSlotCount];
          _selectorSlot = 0;
        }
        selectorInSlotIndex--;
      }
      _selectorCount = selectorSlotCount * 8 + selectorInSlotIndex + 1;
    } else {
      revert('LibDiamondCut: Incorrect FacetCutAction');
    }
    return (_selectorCount, _selectorSlot);
  }

  function initializeDiamondCut(address _init, bytes memory _calldata) internal {
    if (_init == address(0)) {
      require(_calldata.length == 0, 'LibDiamondCut: _init is address(0) but_calldata is not empty');
    } else {
      require(_calldata.length > 0, 'LibDiamondCut: _calldata is empty but _init is not address(0)');
      if (_init != address(this)) {
        enforceHasContractCode(_init, 'LibDiamondCut: _init address has no code');
      }
      (bool success, bytes memory error) = _init.delegatecall(_calldata);
      if (!success) {
        if (error.length > 0) {
          // bubble up the error
          revert(string(error));
        } else {
          revert('LibDiamondCut: _init function reverted');
        }
      }
    }
  }

  function enforceHasContractCode(address _contract, string memory _errorMessage) internal view {
    uint256 contractSize;
    assembly {
      contractSize := extcodesize(_contract)
    }
    require(contractSize > 0, _errorMessage);
  }
}
