// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import '../ERC20/IERC20.sol';

interface IERC1404 is IERC20 {
  function detectTransferRestriction (
    address from,
    address to,
    uint value
  ) external view returns (uint8);

  function messageForTransferRestriction (
    uint8 restrictionCode
  ) external view returns (string memory);
}
