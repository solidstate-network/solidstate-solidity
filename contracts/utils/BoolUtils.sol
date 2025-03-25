// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

library BoolUtils {
    function toBytes32(bool value) internal pure returns (bytes32 result) {
        assembly {
            result := not(not(value))
        }
    }
}
