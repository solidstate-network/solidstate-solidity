// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma abicoder v2;

import '../../access/OwnableStorage.sol';
import './DiamondBase.sol';
import './DiamondCuttable.sol';

contract DiamondCuttableMock is DiamondBase, DiamondCuttable {
  using OwnableStorage for OwnableStorage.Layout;

  constructor () {
    OwnableStorage.layout().setOwner(msg.sender);
  }

  /**
   * @dev suppress compiler warning
   */
  receive () external payable {}
}
