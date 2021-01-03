// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma abicoder v2;

import '../../access/OwnableInternal.sol';
import './DiamondBaseStorage.sol';

// TODO: do not include public Ownable functions

contract DiamondCuttable is OwnableInternal {
  using DiamondBaseStorage for DiamondBaseStorage.Layout;

  function diamondCut (
    DiamondBaseStorage.FacetCut[] calldata cuts
  ) external onlyOwner {
    DiamondBaseStorage.layout().diamondCut(cuts);
  }
}
