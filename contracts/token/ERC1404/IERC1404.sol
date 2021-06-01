// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {IERC20} from '../ERC20/IERC20.sol';

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
