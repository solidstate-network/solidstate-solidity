// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma abicoder v2;

import '../../access/LibOwnable.sol';
import './DiamondBase.sol';
import './DiamondCuttable.sol';

contract DiamondCuttableMock is DiamondBase, DiamondCuttable {
  using LibOwnable for LibOwnable.Layout;

  constructor () {
    LibOwnable.layout().setOwner(msg.sender);
  }

  /**
   * @dev suppress compiler warning
   */
  receive () external payable {}
}
