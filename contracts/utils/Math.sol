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

  /**
   * @notice estimate square root of number
   * @dev uses Babylonian method (https://en.wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
   * @param x input number
   * @return square root
   */
  function sqrt (
    uint x
  ) internal pure returns (uint y) {
    uint z = (x + 1) / 2;
    y = x
    while (z < y) {
      y = z;
      z = (x / z + z) / 2;
    }
  }
}
