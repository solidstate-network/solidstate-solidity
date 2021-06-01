// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {EnumerableSet} from './EnumerableSet.sol';
import {Math} from './Math.sol';

library Array {
  /**
   * @notice get maximum value in an array
   * @param array array to search
   * @return maximum value
   */
  function max (
    uint[] storage array
  ) internal view returns (uint) {
    uint maxValue = 0;

    for (uint i; i < array.length; i++) {
      if (array[i] > maxValue) {
        maxValue = array[i];
      }
    }

    return maxValue;
  }

  /**
   * @notice get minimum value in an array
   * @param array array to search
   * @return minimum value
   */
  function min (
    uint[] storage array
  ) internal view returns (uint) {
    uint minValue = type(uint).max;

    for (uint i; i < array.length; i++) {
      if (array[i] < minValue) {
        minValue = array[i];
      }
    }

    return minValue;
  }

  // TODO: move to EnumerableSet library
  function slice (
    EnumerableSet.AddressSet storage set,
    uint offset,
    uint count
  ) internal view returns (address[] memory) {
    address[] memory output = new address[](count);

    for (uint i; i < count; i++) {
      output[i] = EnumerableSet.at(set, offset + i);
    }

    return output;
  }

  /**
   * @notice find index of first element of array that is greater than or equal to given query
   * @dev array must be sorted in ascending order and contain no duplicates
   * @dev derived from https://github.com/OpenZeppelin/openzeppelin-contracts (MIT license)
   * @param array array to query
   * @param query element to search for
   * @return index of query or array length if query is not found or exceeded
   */
  function findUpperBound(
    uint[] storage array,
    uint query
  ) internal view returns (uint) {
    if (array.length == 0) {
      return 0;
    }

    uint low = 0;
    uint high = array.length;

    while (low < high) {
      uint mid = Math.average(low, high);

      if (array[mid] > query) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }

    return (low > 0 && array[low - 1] == query) ? low - 1 : low;
  }
}
