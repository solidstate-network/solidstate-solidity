// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { AddressUtils } from './AddressUtils.sol';
import { BoolUtils } from './BoolUtils.sol';
import { Int256Utils } from './Int256Utils.sol';
import { UintUtils } from './UintUtils.sol';

library StorageUtils {
    using AddressUtils for address;
    using BoolUtils for bool;
    using Int256Utils for int256;
    using UintUtils for uint256;

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
    function readStorage(bytes32 slot) internal view returns (bytes32 data) {
        assembly {
            data := sload(slot)
        }
    }

    /**
     * @notice read contents of arbitrary transient storage slot
     * @param slot transient storage slot to query
     * @return data contents of transient storage slot
     */
    function readTransient(bytes32 slot) internal view returns (bytes32 data) {
        assembly {
            data := tload(slot)
        }
    }

    /**
     * @notice calculate thes lot of an address index of a mapping
     * @param slot mapping declaration slot
     * @param key index of mapping whose slot to calculate
     */
    function map(bytes32 slot, address key) internal pure returns (bytes32) {
        return map(slot, key.toBytes32());
    }

    /**
     * @notice calculate thes lot of a bool index of a mapping
     * @param slot mapping declaration slot
     * @param key index of mapping whose slot to calculate
     */
    function map(bytes32 slot, bool key) internal pure returns (bytes32) {
        return map(slot, key.toBytes32());
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
     * @notice calculate thes lot of an int256 index of a mapping
     * @param slot mapping declaration slot
     * @param key index of mapping whose slot to calculate
     */
    function map(bytes32 slot, int256 key) internal pure returns (bytes32) {
        return map(slot, key.toBytes32());
    }

    /**
     * @notice calculate thes lot of a uint256 index of a mapping
     * @param slot mapping declaration slot
     * @param key index of mapping whose slot to calculate
     */
    function map(bytes32 slot, uint256 key) internal pure returns (bytes32) {
        return map(slot, key.toBytes32());
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
     * @notice write address to storage slot
     * @param slot storage slot to write to
     * @param data data to write
     */
    function writeStorage(bytes32 slot, address data) internal {
        writeStorage(slot, data.toBytes32());
    }

    /**
     * @notice write bool to storage slot
     * @param slot storage slot to write to
     * @param data data to write
     */
    function writeStorage(bytes32 slot, bool data) internal {
        writeStorage(slot, data.toBytes32());
    }

    /**
     * @notice write bytes32 to storage slot
     * @param slot storage slot to write to
     * @param data data to write
     */
    function writeStorage(bytes32 slot, bytes32 data) internal {
        assembly {
            sstore(slot, data)
        }
    }

    /**
     * @notice write int256 to storage slot
     * @param slot storage slot to write to
     * @param data data to write
     */
    function writeStorage(bytes32 slot, int256 data) internal {
        writeStorage(slot, data.toBytes32());
    }

    /**
     * @notice write uint256 to storage slot
     * @param slot storage slot to write to
     * @param data data to write
     */
    function writeStorage(bytes32 slot, uint256 data) internal {
        writeStorage(slot, data.toBytes32());
    }

    /**
     * @notice write address to transient storage slot
     * @param slot transient storage slot to write to
     * @param value data to write
     */
    function writeTransient(bytes32 slot, address value) internal {
        writeTransient(slot, value.toBytes32());
    }

    /**
     * @notice write bool to transient storage slot
     * @param slot transient storage slot to write to
     * @param value data to write
     */
    function writeTransient(bytes32 slot, bool value) internal {
        writeTransient(slot, value.toBytes32());
    }

    /**
     * @notice write bytes32 to transient storage slot
     * @param slot transient storage slot to write to
     * @param data data to write
     */
    function writeTransient(bytes32 slot, bytes32 data) internal {
        assembly {
            tstore(slot, data)
        }
    }

    /**
     * @notice write int256 to transient storage slot
     * @param slot transient storage slot to write to
     * @param value data to write
     */
    function writeTransient(bytes32 slot, int256 value) internal {
        writeTransient(slot, value.toBytes32());
    }

    /**
     * @notice write uint256 to transient storage slot
     * @param slot transient storage slot to write to
     * @param value data to write
     */
    function writeTransient(bytes32 slot, uint256 value) internal {
        writeTransient(slot, value.toBytes32());
    }
}
