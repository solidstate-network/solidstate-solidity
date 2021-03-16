// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '../../access/OwnableInternal.sol';
import './IDiamondCuttable.sol';
import './DiamondBaseStorage.sol';

/**
 * @title EIP-2535 "Diamond" proxy update contract
 * @dev derived from https://github.com/mudgen/diamond-2 (MIT license)
 */
contract DiamondCuttableFacet is IDiamondCuttable, OwnableInternal {
  using DiamondBaseStorage for DiamondBaseStorage.Layout;

  /// @notice Add/replace/remove any number of functions and optionally execute
  ///         a function with delegatecall
  /// @param _diamondCut Contains the facet addresses and function selectors
  /// @param _init The address of the contract or facet to execute _calldata
  /// @param _calldata A function call, including function selector and arguments
  ///                  _calldata is executed with delegatecall on _init
  function diamondCut(
    FacetCut[] calldata _diamondCut,
    address _init,
    bytes calldata _calldata
  ) external override onlyOwner {
    DiamondBaseStorage.Layout storage l = DiamondBaseStorage.layout();

    uint256 originalSelectorCount = l.selectorCount;
    uint256 selectorCount = originalSelectorCount;
    bytes32 selectorSlot;

    // check if last selector slot is not full
    if (selectorCount % 8 > 0) {
      // get last selectorSlot
      selectorSlot = l.selectorSlots[selectorCount / 8];
    }

    for (uint i; i < _diamondCut.length; i++) {
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
    DiamondBaseStorage.initializeDiamondCut(_init, _calldata);
  }
}
