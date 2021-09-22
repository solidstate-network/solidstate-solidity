// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { Math } from './Math.sol';

library Array {
    /**
     * @notice get maximum value in an array
     * @param array array to search
     * @return maximum value
     */
    function max(uint256[] storage array) internal view returns (uint256) {
        uint256 maxValue = 0;

        for (uint256 i; i < array.length; i++) {
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
    function min(uint256[] storage array) internal view returns (uint256) {
        uint256 minValue = type(uint256).max;

        for (uint256 i; i < array.length; i++) {
            if (array[i] < minValue) {
                minValue = array[i];
            }
        }

        return minValue;
    }

    /**
     * @notice find index of first element of array that is greater than or equal to given query
     * @dev array must be sorted in ascending order and contain no duplicates
     * @dev derived from https://github.com/OpenZeppelin/openzeppelin-contracts (MIT license)
     * @param array array to query
     * @param query element to search for
     * @return index of query or array length if query is not found or exceeded
     */
    function findUpperBound(uint256[] storage array, uint256 query)
        internal
        view
        returns (uint256)
    {
        if (array.length == 0) {
            return 0;
        }

        uint256 low = 0;
        uint256 high = array.length;

        while (low < high) {
            uint256 mid = Math.average(low, high);

            if (array[mid] > query) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }

        return (low > 0 && array[low - 1] == query) ? low - 1 : low;
    }
}
