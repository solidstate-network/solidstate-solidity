// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import './ERC1404.sol';

contract ERC1404Mock is ERC1404 {
  constructor (
    uint8[] memory errorCodes, string[] memory errorMessages
  ) {
    LibERC1404.initialize(errorCodes, errorMessages);
  }

  function detectTransferRestriction (
    address, address, uint
  ) override public pure returns (uint8) {
    return 0;
  }
}
