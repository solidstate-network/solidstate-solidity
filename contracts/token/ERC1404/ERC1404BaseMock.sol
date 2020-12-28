// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma abicoder v2;

import './ERC1404Base.sol';

contract ERC1404BaseMock is ERC1404Base {
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
