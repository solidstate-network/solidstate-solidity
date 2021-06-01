// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {ERC165} from '../../introspection/ERC165.sol';
import {ERC165Storage} from '../../introspection/ERC165Storage.sol';
import {DiamondBase, DiamondBaseStorage, IDiamondCuttable} from './DiamondBase.sol';
import {DiamondLoupe} from './DiamondLoupe.sol';

contract DiamondLoupeMock is DiamondBase, DiamondLoupe, ERC165 {
  using DiamondBaseStorage for DiamondBaseStorage.Layout;
  using ERC165Storage for ERC165Storage.Layout;

  constructor (IDiamondCuttable.FacetCut[] memory cuts) {
    DiamondBaseStorage.layout().diamondCut(cuts, address(0), '');
    ERC165Storage.layout().setSupportedInterface(type(IERC165).interfaceId, true);
    ERC165Storage.layout().setSupportedInterface(type(IDiamondLoupe).interfaceId, true);
  }

  /**
   * @dev suppress compiler warning
   */
  receive () external payable {}
}
