// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

library StorageUtils {
    type StorageSlot is bytes32;
    type TransientSlot is bytes32;

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
     * @notice calculate the slot of an index of an array
     * @param slot array declaration slot where its length is stored
     * @param idx index of array whose slot to calculate
     */
    function index(
        StorageSlot slot,
        uint256 idx
    ) internal pure returns (StorageSlot) {
        return StorageSlot.wrap(_index(StorageSlot.unwrap(slot), idx));
    }

    /**
     * @notice calculate the slot of an index of an array
     * @param slot array declaration slot where its length is stored
     * @param idx index of array whose slot to calculate
     */
    function index(
        TransientSlot slot,
        uint256 idx
    ) internal pure returns (TransientSlot) {
        return TransientSlot.wrap(_index(TransientSlot.unwrap(slot), idx));
    }

    /**
     * @notice calculate the slot of a bytes32 index of a mapping in storage
     * @param slot mapping declaration slot
     * @param key index of mapping whose slot to calculate
     */
    function map(
        StorageSlot slot,
        bytes32 key
    ) internal pure returns (StorageSlot) {
        return StorageSlot.wrap(_map(StorageSlot.unwrap(slot), key));
    }

    /**
     * @notice calculate the slot of a bytes32 index of a mapping in transient storage
     * @param slot mapping declaration slot
     * @param key index of mapping whose slot to calculate
     */
    function map(
        TransientSlot slot,
        bytes32 key
    ) internal pure returns (TransientSlot) {
        return TransientSlot.wrap(_map(TransientSlot.unwrap(slot), key));
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

    /**
     * @notice calculate the slot of an index of an array
     * @param slot array declaration slot where its length is stored
     * @param idx index of array whose slot to calculate
     */
    function _index(bytes32 slot, uint256 idx) private pure returns (bytes32) {
        assembly {
            mstore(0, slot)
            slot := add(keccak256(0, 32), idx)
        }

        return slot;
    }

    /**
     * @notice calculate the slot of a bytes32 index of a mapping
     * @param slot mapping declaration slot
     * @param key index of mapping whose slot to calculate
     */
    function _map(bytes32 slot, bytes32 key) private pure returns (bytes32) {
        assembly {
            mstore(0, key)
            mstore(32, slot)
            slot := keccak256(0, 64)
        }

        return slot;
    }
}
