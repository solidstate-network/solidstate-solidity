// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

/**
 * @title Helper library for safe casting of uint and int values
 * @dev derived from https://github.com/OpenZeppelin/openzeppelin-contracts (MIT license)
 */
library SafeCast {
    error SafeCast__NegativeValue();
    error SafeCast__ValueDoesNotFit();

    function toUint224(uint256 value) internal pure returns (uint224) {
        if (value > type(uint224).max) revert SafeCast__ValueDoesNotFit();
        return uint224(value);
    }

    function toUint128(uint256 value) internal pure returns (uint128) {
        if (value > type(uint128).max) revert SafeCast__ValueDoesNotFit();
        return uint128(value);
    }

    function toUint96(uint256 value) internal pure returns (uint96) {
        if (value > type(uint96).max) revert SafeCast__ValueDoesNotFit();
        return uint96(value);
    }

    function toUint64(uint256 value) internal pure returns (uint64) {
        if (value > type(uint64).max) revert SafeCast__ValueDoesNotFit();
        return uint64(value);
    }

    function toUint32(uint256 value) internal pure returns (uint32) {
        if (value > type(uint32).max) revert SafeCast__ValueDoesNotFit();
        return uint32(value);
    }

    function toUint16(uint256 value) internal pure returns (uint16) {
        if (value > type(uint16).max) revert SafeCast__ValueDoesNotFit();
        return uint16(value);
    }

    function toUint8(uint256 value) internal pure returns (uint8) {
        if (value > type(uint8).max) revert SafeCast__ValueDoesNotFit();
        return uint8(value);
    }

    function toUint256(int256 value) internal pure returns (uint256) {
        if (value < 0) revert SafeCast__NegativeValue();
        return uint256(value);
    }

    function toInt128(int256 value) internal pure returns (int128) {
        if (value < type(int128).min || value > type(int128).max)
            revert SafeCast__ValueDoesNotFit();

        return int128(value);
    }

    function toInt64(int256 value) internal pure returns (int64) {
        if (value < type(int64).min || value > type(int64).max)
            revert SafeCast__ValueDoesNotFit();
        return int64(value);
    }

    function toInt32(int256 value) internal pure returns (int32) {
        if (value < type(int32).min || value > type(int32).max)
            revert SafeCast__ValueDoesNotFit();
        return int32(value);
    }

    function toInt16(int256 value) internal pure returns (int16) {
        if (value < type(int16).min || value > type(int16).max)
            revert SafeCast__ValueDoesNotFit();
        return int16(value);
    }

    function toInt8(int256 value) internal pure returns (int8) {
        if (value < type(int8).min || value > type(int8).max)
            revert SafeCast__ValueDoesNotFit();
        return int8(value);
    }

    function toInt256(uint256 value) internal pure returns (int256) {
        if (value > uint256(type(int256).max))
            revert SafeCast__ValueDoesNotFit();
        return int256(value);
    }
}
