// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma abicoder v2;

import './ERC1404.sol';

contract ERC1404Mock is ERC1404 {
  using LibERC1404 for LibERC1404.Layout;

  constructor (
    uint8[] memory errorCodes,
    string[] memory errorMessages
  ) {
    LibERC1404.setRestrictions(errorCodes, errorMessages);
  }

  function detectTransferRestriction (
    address, address, uint
  ) override public pure returns (uint8) {
    return 0;
  }
}
