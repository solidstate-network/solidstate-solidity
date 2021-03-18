// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './DiamondBase.sol';
import './DiamondLoupe.sol';

contract DiamondLoupeMock is DiamondBase, DiamondLoupe {
  using DiamondBaseStorage for DiamondBaseStorage.Layout;

  constructor (IDiamondCuttable.FacetCut[] memory cuts) {
    DiamondBaseStorage.layout().diamondCut(cuts, address(0), '');
  }

  /**
   * @dev suppress compiler warning
   */
  receive () external payable {}
}
