// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

library Int256 {
    /**
     * @notice convert int256 to bytes32
     * @param value int256 to convert to bytes32
     * @return result bytes32 representation of int256
     */
    function toBytes32(int256 value) internal pure returns (bytes32 result) {
        assembly {
            result := value
        }
    }
}
