// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

/**
 * @title Uint representation modifiable only by increment or decrement
 * @dev underlying value must not be directly accessed
 * @dev derived from https://github.com/OpenZeppelin/openzeppelin-contracts (MIT license)
 */
library Counter {
  struct Counter {
    uint256 _value;
  }

  function current(
    Counter storage counter
  ) internal view returns (uint256) {
    return counter._value;
  }

  function increment(
    Counter storage counter
  ) internal {
    counter._value++;
  }

  function decrement(
    Counter storage counter
  ) internal {
    require(counter._value > 0, 'Counter: underflow');
    counter._value--;
  }
}
