// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma abicoder v2;

import './ERC1404.sol';

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
}
