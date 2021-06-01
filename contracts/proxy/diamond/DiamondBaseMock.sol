// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {DiamondBase, DiamondBaseStorage, IDiamondCuttable} from './DiamondBase.sol';

contract DiamondBaseMock is DiamondBase {
  using DiamondBaseStorage for DiamondBaseStorage.Layout;

  constructor (IDiamondCuttable.FacetCut[] memory cuts) {
    DiamondBaseStorage.layout().diamondCut(cuts, address(0), '');
  }
}
