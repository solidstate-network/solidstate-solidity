// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma abicoder v2;

import '../../access/OwnableStorage.sol';
import './LibDiamondBase.sol';

// TODO: do not include public Ownable functions

contract DiamondCuttable is OwnableStorage {
  using LibDiamondBase for LibDiamondBase.Layout;

  function diamondCut (
    LibDiamondBase.FacetCut[] calldata cuts
  ) external onlyOwner {
    LibDiamondBase.layout().diamondCut(cuts);
  }
}
