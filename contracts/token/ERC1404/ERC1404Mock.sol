// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {ERC1404} from './ERC1404.sol';
import {ERC1404Storage} from './ERC1404Storage.sol';

contract ERC1404Mock is ERC1404 {
  using ERC1404Storage for ERC1404Storage.Layout;

  constructor (
    uint8[] memory errorCodes,
    string[] memory errorMessages
  ) {
    ERC1404Storage.layout().setRestrictions(errorCodes, errorMessages);
  }

  function detectTransferRestriction (
    address, address, uint
  ) override public pure returns (uint8) {
    return 0;
  }

  function mint (
    address account,
    uint amount
  ) external {
    _mint(account, amount);
  }

  function burn (
    address account,
    uint amount
  ) external {
    _burn(account, amount);
  }
}
