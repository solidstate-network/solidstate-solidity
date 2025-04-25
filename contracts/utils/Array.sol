// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

library Array {
    /**
     * @notice get minimum value in given array
     * @param array array to search
     * @return minimum value
     */
    function min(bytes32[] memory array) internal pure returns (bytes32) {
        bytes32 minValue = bytes32(type(uint256).max);

        unchecked {
            for (uint256 i; i < array.length; i++) {
                if (array[i] < minValue) {
                    minValue = array[i];
                }
            }
        }

        return minValue;
    }

    /**
     * @notice get minimum value in given array
     * @param array array to search
     * @return minimum value
     */
    function min(address[] memory array) internal pure returns (address) {
        address minValue = address(type(uint160).max);

        unchecked {
            for (uint256 i; i < array.length; i++) {
                if (array[i] < minValue) {
                    minValue = array[i];
                }
            }
        }

        return minValue;
    }

    /**
     * @notice get minimum value in given array
     * @param array array to search
     * @return minimum value
     */
    function min(uint256[] memory array) internal pure returns (uint256) {
        uint256 minValue = type(uint256).max;

        unchecked {
            for (uint256 i; i < array.length; i++) {
                if (array[i] < minValue) {
                    minValue = array[i];
                }
            }
        }

        return minValue;
    }

    /**
     * @notice get maximum value in given array
     * @param array array to search
     * @return maximum value
     */
    function max(bytes32[] memory array) internal pure returns (bytes32) {
        bytes32 maxValue = bytes32(0);

        unchecked {
            for (uint256 i; i < array.length; i++) {
                if (array[i] > maxValue) {
                    maxValue = array[i];
                }
            }
        }

        return maxValue;
    }

    /**
     * @notice get maximum value in given array
     * @param array array to search
     * @return maximum value
     */
    function max(address[] memory array) internal pure returns (address) {
        address maxValue = address(0);

        unchecked {
            for (uint256 i; i < array.length; i++) {
                if (array[i] > maxValue) {
                    maxValue = array[i];
                }
            }
        }

        return maxValue;
    }

    /**
     * @notice get maximum value in given array
     * @param array array to search
     * @return maximum value
     */
    function max(uint256[] memory array) internal pure returns (uint256) {
        uint256 maxValue = 0;

        unchecked {
            for (uint256 i; i < array.length; i++) {
                if (array[i] > maxValue) {
                    maxValue = array[i];
                }
            }
        }

        return maxValue;
    }

    /**
     * @notice cast bytes32[] storage pointer to address[] storage pointer
     * @param array bytes32 array to cast
     * @return addressArray address array
     */
    function toAddressArray(
        bytes32[] storage array
    ) internal pure returns (address[] storage addressArray) {
        assembly {
            addressArray.slot := array.slot
        }
    }

    /**
     * @notice cast bytes32[] storage pointer to uint256[] storage pointer
     * @param array bytes32 array to cast
     * @return uint256Array uint256 array
     */
    function toUint256Array(
        bytes32[] storage array
    ) internal pure returns (uint256[] storage uint256Array) {
        assembly {
            uint256Array.slot := array.slot
        }
    }
}
