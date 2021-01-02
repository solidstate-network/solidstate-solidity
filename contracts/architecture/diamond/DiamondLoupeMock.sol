// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma abicoder v2;

import './DiamondBase.sol';
import './DiamondLoupe.sol';

contract DiamondLoupeMock is DiamondBase, DiamondLoupe {
  using LibDiamondBase for LibDiamondBase.Layout;

  constructor (LibDiamondBase.FacetCut[] memory cuts) {
    LibDiamondBase.layout().diamondCut(cuts);
  }

  /**
   * @dev suppress compiler warning
   */
  receive () external payable {}
}
