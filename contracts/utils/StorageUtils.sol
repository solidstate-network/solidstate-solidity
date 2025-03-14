// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

library StorageUtils {
    /**
     * @notice calculate the EIP-7201 storage slot for a given string id
     * @dev id parameter should not contain whitespace
     * @dev see https://eips.ethereum.org/EIPS/eip-7201
     * @param id namespace id
     */
    function calculateStorageSlot(
        string memory id
    ) internal pure returns (bytes32 slot) {
        slot =
            keccak256(abi.encode(uint256(keccak256(bytes(id))) - 1)) &
            ~bytes32(uint256(0xff));
    }

    /**
     * @notice read contents of arbitrary storage slot
     * @param slot storage slot to query
     * @return data contents of storage slot
     */
    function read(uint256 slot) internal view returns (bytes32 data) {
        assembly {
            data := sload(slot)
        }
    }

    /**
     * @notice write arbitrary data to storage slot
     * @param slot storage slot to write to
     * @param data data to write
     */
    function write(uint256 slot, bytes32 data) internal {
        assembly {
            sstore(slot, data)
        }
    }
}
