// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma abicoder v2;

import './DiamondBase.sol';

contract DiamondBaseMock is DiamondBase {
  using LibDiamondBase for LibDiamondBase.Layout;

  constructor (LibDiamondBase.FacetCut[] memory cuts) {
    LibDiamondBase.layout().diamondCut(cuts);
  }
}
