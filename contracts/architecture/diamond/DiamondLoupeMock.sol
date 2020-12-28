// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma abicoder v2;

import './DiamondBase.sol';
import './DiamondLoupe.sol';

contract DiamondLoupeMock is DiamondBase, DiamondLoupe {
  constructor (LibDiamondBase.FacetCut[] memory cuts) {
    LibDiamondBase.initialize(cuts);
  }

  /**
   * @dev suppress compiler warning
   */
  receive () external payable {}
}
