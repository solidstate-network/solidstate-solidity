// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Uint256Utils } from './Uint256Utils.sol';

/**
 * @title utility functions for bytes32 operations
 */
library Bytes32Utils {
    /**
     * @notice convert 20 lower-order bytes of bytes32 data payload to sanitized address
     * @param data bytes32 value to convert
     * @return result address result
     */
    function toAddress(bytes32 data) internal pure returns (address result) {
        assembly {
            result := and(data, shr(96, not(0)))
        }
    }

    /**
     * @notice convert lowest-order bit of bytes32 data payload to sanitized bool
     * @dev TODO: disambiguate a possible function that returns "truthiness" of bytes32
     * @param data bytes32 value to convert
     * @return result bool result
     */
    function toBool(bytes32 data) internal pure returns (bool result) {
        assembly {
            result := and(data, 1)
        }
    }

    /**
     * @notice convert bytes32 data payload to int256
     * @param data bytes32 value to convert
     * @return result int256 result
     */
    function toInt256(bytes32 data) internal pure returns (int256 result) {
        assembly {
            result := data
        }
    }

    /**
     * @notice convert bytes32 data payload to uint256
     * @param data bytes32 value to convert
     * @return result uint256 result
     */
    function toUint256(bytes32 data) internal pure returns (uint256 result) {
        result = uint256(data);
    }

    /**
     * @notice output the 0x-prefixed hexadecimal string representation of a bytes32
     * @param value bytes32 to format as string
     * @return output formatted string
     */
    function toString(
        bytes32 value
    ) internal pure returns (string memory output) {
        output = Uint256Utils.toHexString(uint256(value), 32);
    }
}
