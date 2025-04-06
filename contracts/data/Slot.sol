// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

type sslot is bytes32;
type tslot is bytes32;

using Slot for sslot global;
using Slot for tslot global;

library Slot {
    /**
     * @notice calculate the EIP-7201 storage slot for a given string id
     * @dev id parameter should not contain whitespace
     * @dev see https://eips.ethereum.org/EIPS/eip-7201
     * @param id namespace id
     * @return slot storage slot
     */
    function calculateErc7201StorageSlot(
        string memory id
    ) internal pure returns (sslot slot) {
        slot = sslot.wrap(
            keccak256(abi.encode(uint256(keccak256(bytes(id))) - 1)) &
                ~bytes32(uint256(0xff))
        );
    }

    /**
     * @notice calculate the EIP-7201 storage slot for a given string id
     * @dev id parameter should not contain whitespace
     * @dev see https://eips.ethereum.org/EIPS/eip-7201
     * @param id namespace id
     * @return slot transient slot
     */
    function calculateErc7201TransientSlot(
        string memory id
    ) internal pure returns (tslot slot) {
        slot = tslot.wrap(
            keccak256(abi.encode(uint256(keccak256(bytes(id))) - 1)) &
                ~bytes32(uint256(0xff))
        );
    }

    /**
     * @notice calculate the slot of an index of an array
     * @param slot array declaration slot where its length is stored
     * @param idx index of array whose slot to calculate
     */
    function index(sslot slot, uint256 idx) internal pure returns (sslot) {
        return sslot.wrap(_index(sslot.unwrap(slot), idx));
    }

    /**
     * @notice calculate the slot of an index of an array
     * @param slot array declaration slot where its length is stored
     * @param idx index of array whose slot to calculate
     */
    function index(tslot slot, uint256 idx) internal pure returns (tslot) {
        return tslot.wrap(_index(tslot.unwrap(slot), idx));
    }

    /**
     * @notice calculate the slot of a bytes32 index of a mapping in storage
     * @param slot mapping declaration slot
     * @param key index of mapping whose slot to calculate
     */
    function map(sslot slot, bytes32 key) internal pure returns (sslot) {
        return sslot.wrap(_map(sslot.unwrap(slot), key));
    }

    /**
     * @notice calculate the slot of a bytes32 index of a mapping in transient storage
     * @param slot mapping declaration slot
     * @param key index of mapping whose slot to calculate
     */
    function map(tslot slot, bytes32 key) internal pure returns (tslot) {
        return tslot.wrap(_map(tslot.unwrap(slot), key));
    }

    /**
     * @notice return the next storage slot
     * @param slot current slot
     * @return next slot
     */
    function next(sslot slot) internal pure returns (sslot) {
        return next(slot, 1);
    }

    /**
     * @notice return the next transient slot
     * @param slot current slot
     * @return next slot
     */
    function next(tslot slot) internal pure returns (tslot) {
        return next(slot, 1);
    }

    /**
     * @notice return the nth next storage slot
     * @param slot current slot
     * @param amount number of slots to shift
     * @return nth next slot
     */
    function next(sslot slot, uint256 amount) internal pure returns (sslot) {
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
    function next(tslot slot, uint256 amount) internal pure returns (tslot) {
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
    function prev(sslot slot) internal pure returns (sslot) {
        return prev(slot, 1);
    }

    /**
     * @notice return the previous transient slot
     * @param slot current slot
     * @return previous slot
     */
    function prev(tslot slot) internal pure returns (tslot) {
        return prev(slot, 1);
    }

    /**
     * @notice return the nth previous storage slot
     * @param slot current slot
     * @param amount number of slots to shift
     * @return nth previous slot
     */
    function prev(sslot slot, uint256 amount) internal pure returns (sslot) {
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
    function prev(tslot slot, uint256 amount) internal pure returns (tslot) {
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
    function read(sslot slot) internal view returns (bytes32 data) {
        assembly {
            data := sload(slot)
        }
    }

    /**
     * @notice read contents of arbitrary transient storage slot
     * @param slot transient storage slot to query
     * @return data contents of transient storage slot
     */
    function read(tslot slot) internal view returns (bytes32 data) {
        assembly {
            data := tload(slot)
        }
    }

    /**
     * @notice write bytes32 to storage slot
     * @param slot storage slot to write to
     * @param data data to write
     */
    function write(sslot slot, bytes32 data) internal {
        assembly {
            sstore(slot, data)
        }
    }

    /**
     * @notice write bytes32 to transient storage slot
     * @param slot transient storage slot to write to
     * @param data data to write
     */
    function write(tslot slot, bytes32 data) internal {
        assembly {
            tstore(slot, data)
        }
    }

    /**
     * @notice clear contents of storage slot
     * @param slot storage slot to clear
     */
    function clear(sslot slot) internal {
        write(slot, bytes32(0));
    }

    /**
     * @notice clear contents of transient storage slot
     * @param slot transient storage slot to clear
     */
    function clear(tslot slot) internal {
        write(slot, bytes32(0));
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
