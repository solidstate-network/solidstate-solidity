// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

library Slot {
    type StorageSlot is bytes32;
    type TransientSlot is bytes32;

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
     * @notice return the next storage slot
     * @param slot current slot
     * @return next slot
     */
    function next(StorageSlot slot) internal pure returns (StorageSlot) {
        return next(slot, 1);
    }

    /**
     * @notice return the next transient slot
     * @param slot current slot
     * @return next slot
     */
    function next(TransientSlot slot) internal pure returns (TransientSlot) {
        return next(slot, 1);
    }

    /**
     * @notice return the nth next storage slot
     * @param slot current slot
     * @param amount number of slots to shift
     * @return nth next slot
     */
    function next(
        StorageSlot slot,
        uint256 amount
    ) internal pure returns (StorageSlot) {
        assembly {
            slot := add(slot, amount)
        }

        return slot;
    }

    /**
     * @notice return the nth next transient slot
     * @param slot current slot
     * @param amount number of slots to shift
     * @return nth next slot
     */
    function next(
        TransientSlot slot,
        uint256 amount
    ) internal pure returns (TransientSlot) {
        assembly {
            slot := add(slot, amount)
        }

        return slot;
    }

    /**
     * @notice return the previous storage slot
     * @param slot current slot
     * @return previous slot
     */
    function prev(StorageSlot slot) internal pure returns (StorageSlot) {
        return prev(slot, 1);
    }

    /**
     * @notice return the previous transient slot
     * @param slot current slot
     * @return previous slot
     */
    function prev(TransientSlot slot) internal pure returns (TransientSlot) {
        return prev(slot, 1);
    }

    /**
     * @notice return the nth previous storage slot
     * @param slot current slot
     * @param amount number of slots to shift
     * @return nth previous slot
     */
    function prev(
        StorageSlot slot,
        uint256 amount
    ) internal pure returns (StorageSlot) {
        assembly {
            slot := sub(slot, amount)
        }

        return slot;
    }

    /**
     * @notice return the nth previous transient slot
     * @param slot current slot
     * @param amount number of slots to shift
     * @return nth previous slot
     */
    function prev(
        TransientSlot slot,
        uint256 amount
    ) internal pure returns (TransientSlot) {
        assembly {
            slot := sub(slot, amount)
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

    /**
     * @notice clearn contents of storage slot
     * @param slot storage slot to clear
     */
    function clear(StorageSlot slot) internal {
        assembly {
            sstore(slot, 0)
        }
    }

    /**
     * @notice clearn contents of transient storage slot
     * @param slot transient storage slot to clear
     */
    function clear(TransientSlot slot) internal {
        assembly {
            tstore(slot, 0)
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
