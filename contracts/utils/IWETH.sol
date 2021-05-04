// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '../token/ERC20/IERC20.sol';
import '../token/ERC20/IERC20Metadata.sol';

interface IWETH is IERC20, IERC20Metadata {
  function deposit () external payable;

  function withdraw (
    uint amount
  ) external;
}
