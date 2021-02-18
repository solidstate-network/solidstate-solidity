// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '../../access/OwnableInternal.sol';
import './DiamondBaseStorage.sol';

contract DiamondCuttable is OwnableInternal {
  using DiamondBaseStorage for DiamondBaseStorage.Layout;

  function diamondCut (
    DiamondBaseStorage.FacetCut[] calldata cuts
  ) external onlyOwner {
    DiamondBaseStorage.layout().diamondCut(cuts);
  }
}
