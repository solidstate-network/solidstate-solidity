// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {OwnableStorage} from '../../access/OwnableStorage.sol';
import {ERC165} from '../../introspection/ERC165.sol';
import {ERC165Storage} from '../../introspection/ERC165Storage.sol';
import {DiamondBase} from './DiamondBase.sol';
import {DiamondCuttable} from './DiamondCuttable.sol';

contract DiamondCuttableMock is DiamondBase, DiamondCuttable, ERC165 {
  using OwnableStorage for OwnableStorage.Layout;
  using ERC165Storage for ERC165Storage.Layout;

  constructor () {
    OwnableStorage.layout().setOwner(msg.sender);
    ERC165Storage.layout().setSupportedInterface(type(IERC165).interfaceId, true);
    ERC165Storage.layout().setSupportedInterface(type(IDiamondCuttable).interfaceId, true);
  }

  /**
   * @dev suppress compiler warning
   */
  receive () external payable {}
}
