// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { UintUtils } from './UintUtils.sol';

/**
 * @title utility functions for bytes32 operations
 */
library Bytes32Utils {
    /**
     * @notice output the 0x-prefixed hexadecimal string representation of a bytes32
     * @param value bytes32 to format as string
     * @return output formatted string
     */
    function toString(
        bytes32 value
    ) internal pure returns (string memory output) {
        output = UintUtils.toHexString(uint256(value), 32);
    }
}
