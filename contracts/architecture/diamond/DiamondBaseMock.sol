// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma abicoder v2;

import './DiamondBase.sol';

contract DiamondBaseMock is DiamondBase {
  constructor (LibDiamondBase.FacetCut[] memory cuts) {
    LibDiamondBase.initialize(cuts);
  }
}
