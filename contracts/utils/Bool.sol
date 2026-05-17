// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

library Bool {
    /**
     * @notice sanitize higher-order bits of bool and convert to bytes32
     * @param value bool to convert to bytes32
     * @return result bytes32 representation of bool
     */
    function toBytes32(bool value) internal pure returns (bytes32 result) {
        assembly {
            result := iszero(iszero(value))
        }
    }

    function toUint256(bool value) internal pure returns (uint256 result) {
        assembly {
            result := iszero(iszero(value))
        }
    }

    function xor(bool value0, bool value1) internal pure returns (bool result) {
        assembly {
            result := xor(value0, value1)
        }
    }
}
