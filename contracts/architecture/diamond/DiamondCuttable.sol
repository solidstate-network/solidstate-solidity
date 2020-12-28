// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma abicoder v2;

import '../../access/OwnableStorage.sol';
import './LibDiamondBase.sol';

// TODO: do not include public Ownable functions

contract DiamondCuttable is OwnableStorage {
  function diamondCut (
    LibDiamondBase.FacetCut[] calldata cuts
  ) external onlyOwner {
    for (uint i; i < cuts.length; i++) {
      LibDiamondBase.diamondCut(cuts[i]);
    }
  }
}
