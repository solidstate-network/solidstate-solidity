// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './DiamondBase.sol';

contract DiamondBaseMock is DiamondBase {
  using DiamondBaseStorage for DiamondBaseStorage.Layout;

  constructor (DiamondBaseStorage.FacetCut[] memory cuts) {
    DiamondBaseStorage.layout().diamondCut(cuts);
  }
}
