// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

library StorageUtils {
    type TransientSlot is bytes32;
    type StorageSlot is bytes32;

    /**
     * @notice calculate the EIP-7201 storage slot for a given string id
     * @dev id parameter should not contain whitespace
     * @dev see https://eips.ethereum.org/EIPS/eip-7201
     * @param id namespace id
     */
    function calculateErc7201StorageSlot(
        string memory id
    ) internal pure returns (bytes32 slot) {
        slot =
            keccak256(abi.encode(uint256(keccak256(bytes(id))) - 1)) &
            ~bytes32(uint256(0xff));
    }

    /**
     * @notice calculate thes lot of a bytes32 index of a mapping
     * @param slot mapping declaration slot
     * @param key index of mapping whose slot to calculate
     */
    function map(bytes32 slot, bytes32 key) internal pure returns (bytes32) {
        assembly {
            mstore(0, key)
            mstore(32, slot)
            slot := keccak256(0, 64)
        }

        return slot;
    }

    /**
     * @notice calculate the slot of an index of an array
     * @param slot array declaration slot where its length is stored
     * @param idx index of array whose slot to calculate
     */
    function index(bytes32 slot, uint256 idx) internal pure returns (bytes32) {
        assembly {
            mstore(0, slot)
            slot := add(keccak256(0, 32), idx)
        }

        return slot;
    }

    /**
     * @notice read contents of arbitrary storage slot
     * @param slot storage slot to query
     * @return data contents of storage slot
     */
    function read(StorageSlot slot) internal view returns (bytes32 data) {
        assembly {
            data := sload(slot)
        }
    }

    /**
     * @notice read contents of arbitrary transient storage slot
     * @param slot transient storage slot to query
     * @return data contents of transient storage slot
     */
    function read(TransientSlot slot) internal view returns (bytes32 data) {
        assembly {
            data := tload(slot)
        }
    }

    /**
     * @notice write bytes32 to storage slot
     * @param slot storage slot to write to
     * @param data data to write
     */
    function write(StorageSlot slot, bytes32 data) internal {
        assembly {
            sstore(slot, data)
        }
    }

    /**
     * @notice write bytes32 to transient storage slot
     * @param slot transient storage slot to write to
     * @param data data to write
     */
    function write(TransientSlot slot, bytes32 data) internal {
        assembly {
            tstore(slot, data)
        }
    }
}
