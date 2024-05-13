// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

library StorageUtils {
    function read(uint256 slot) internal view returns (bytes32 data) {
        assembly {
            data := sload(slot)
        }
    }

    function write(uint256 slot, bytes32 data) internal {
        assembly {
            sstore(slot, data)
        }
    }
}
