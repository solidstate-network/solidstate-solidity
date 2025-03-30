// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

library Panic {
    uint256 internal constant GENERIC = 0x00;
    uint256 internal constant ASSERTION_ERROR = 0x01;
    uint256 internal constant ARITHMETIC_OVERFLOW = 0x11;
    uint256 internal constant DIVISION_BY_ZERO = 0x12;
    uint256 internal constant ENUM_CONVERSION_OUT_OF_BOUNDS = 0x21;
    uint256 internal constant INCORRECTLY_ENCODED_STORAGE_BYTE_ARRAY = 0x22;
    uint256 internal constant POP_ON_EMPTY_ARRAY = 0x31;
    uint256 internal constant ARRAY_ACCESS_OUT_OF_BOUNDS = 0x32;
    uint256 internal constant TOO_MUCH_MEMORY_ALLOCATED = 0x41;
    uint256 internal constant ZERO_INITIALIZED_VARIABLE = 0x51;

    /**
     * @notice revert with panic
     * @param code panic code
     */
    function panic(uint256 code) internal pure {
        // revert with the selector for Panic(uint256)
        assembly ('memory-safe') {
            mstore(0, 0x4e487b71)
            mstore(32, code)
            revert(28, 36)
        }
    }
}
