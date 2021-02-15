// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

library Math {
  /**
   * @notice calculate the average of two numbers, rounded down
   * @dev derived from https://github.com/OpenZeppelin/openzeppelin-contracts (MIT license)
   * @param a first number
   * @param b second number
   */
  function average (
    uint a,
    uint b
  ) internal pure returns (uint) {
    return (a / 2) + (b / 2) + ((a % 2 + b % 2) / 2);
  }
}
