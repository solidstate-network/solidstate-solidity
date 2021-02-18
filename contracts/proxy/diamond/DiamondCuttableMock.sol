// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

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
