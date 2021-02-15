// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma abicoder v2;

import './DiamondBase.sol';

contract DiamondBaseMock is DiamondBase {
  using DiamondBaseStorage for DiamondBaseStorage.Layout;

  constructor (DiamondBaseStorage.FacetCut[] memory cuts) {
    DiamondBaseStorage.layout().diamondCut(cuts);
  }
}
