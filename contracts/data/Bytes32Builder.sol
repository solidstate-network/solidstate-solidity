// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Address } from '../utils/Address.sol';
import { Bool } from '../utils/Bool.sol';
import { Bytes32 } from '../utils/Bytes32.sol';
import { Int256 } from '../utils/Int256.sol';
import { Uint256 } from '../utils/Uint256.sol';

/**
 * @title Procedurally generated library for packing primitive types into bytes32
 **/
library Bytes32Builder {
    struct Builder {
        bytes32 _data;
        uint256 _size;
    }

    bytes32 private constant MASK_01 =
        0x00000000000000000000000000000000000000000000000000000000000000ff;
    bytes32 private constant MASK_02 =
        0x000000000000000000000000000000000000000000000000000000000000ffff;
    bytes32 private constant MASK_03 =
        0x0000000000000000000000000000000000000000000000000000000000ffffff;
    bytes32 private constant MASK_04 =
        0x00000000000000000000000000000000000000000000000000000000ffffffff;
    bytes32 private constant MASK_05 =
        0x000000000000000000000000000000000000000000000000000000ffffffffff;
    bytes32 private constant MASK_06 =
        0x0000000000000000000000000000000000000000000000000000ffffffffffff;
    bytes32 private constant MASK_07 =
        0x00000000000000000000000000000000000000000000000000ffffffffffffff;
    bytes32 private constant MASK_08 =
        0x000000000000000000000000000000000000000000000000ffffffffffffffff;
    bytes32 private constant MASK_09 =
        0x0000000000000000000000000000000000000000000000ffffffffffffffffff;
    bytes32 private constant MASK_10 =
        0x00000000000000000000000000000000000000000000ffffffffffffffffffff;
    bytes32 private constant MASK_11 =
        0x000000000000000000000000000000000000000000ffffffffffffffffffffff;
    bytes32 private constant MASK_12 =
        0x0000000000000000000000000000000000000000ffffffffffffffffffffffff;
    bytes32 private constant MASK_13 =
        0x00000000000000000000000000000000000000ffffffffffffffffffffffffff;
    bytes32 private constant MASK_14 =
        0x000000000000000000000000000000000000ffffffffffffffffffffffffffff;
    bytes32 private constant MASK_15 =
        0x0000000000000000000000000000000000ffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_16 =
        0x00000000000000000000000000000000ffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_17 =
        0x000000000000000000000000000000ffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_18 =
        0x0000000000000000000000000000ffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_19 =
        0x00000000000000000000000000ffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_20 =
        0x000000000000000000000000ffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_21 =
        0x0000000000000000000000ffffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_22 =
        0x00000000000000000000ffffffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_23 =
        0x000000000000000000ffffffffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_24 =
        0x0000000000000000ffffffffffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_25 =
        0x00000000000000ffffffffffffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_26 =
        0x000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_27 =
        0x0000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_28 =
        0x00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_29 =
        0x000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_30 =
        0x0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_31 =
        0x00ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_32 =
        0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;

    /**
     * @notice insert bytes1 value to 1-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes1 to add
     */
    function pushBytes1(Builder memory self, bytes1 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 248) << self._size;
            self._size += 8;
        }
    }

    /**
     * @notice remove last 1-byte segment from bytes and return as bytes1
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes1 derived from bytes
     */
    function popBytes1(
        Builder memory self
    ) internal pure returns (bytes1 element) {
        unchecked {
            self._size -= 8;
            bytes32 mask = MASK_01;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes1(elementBytes << 248);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 1-byte segment from bytes and return as bytes1
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes1 derived from bytes
     */
    function shiftBytes1(
        Builder memory self
    ) internal pure returns (bytes1 element) {
        unchecked {
            bytes32 mask = MASK_01;
            bytes32 elementBytes = self._data & mask;
            element = bytes1(elementBytes << 248);
            self._data >>= 8;
            self._size -= 8;
        }
    }

    /**
     * @notice insert bytes1 value to 1-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes1 to add
     */
    function unshiftBytes1(Builder memory self, bytes1 element) internal pure {
        unchecked {
            self._data = (self._data << 8) | (bytes32(element) >> 248);
            self._size += 8;
        }
    }
    /**
     * @notice insert int8 value to 1-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int8 to add
     */
    function pushInt8(Builder memory self, int8 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 248)) <<
                self._size;
            self._size += 8;
        }
    }

    /**
     * @notice remove last 1-byte segment from bytes and return as int8
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int8 derived from bytes
     */
    function popInt8(Builder memory self) internal pure returns (int8 element) {
        unchecked {
            self._size -= 8;
            bytes32 mask = MASK_01;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int8(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 1-byte segment from bytes and return as int8
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int8 derived from bytes
     */
    function shiftInt8(
        Builder memory self
    ) internal pure returns (int8 element) {
        unchecked {
            bytes32 mask = MASK_01;
            bytes32 elementBytes = self._data & mask;
            element = int8(Bytes32.toInt256(elementBytes));
            self._data >>= 8;
            self._size -= 8;
        }
    }

    /**
     * @notice insert int8 value to 1-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int8 to add
     */
    function unshiftInt8(Builder memory self, int8 element) internal pure {
        unchecked {
            self._data =
                (self._data << 8) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 248));
            self._size += 8;
        }
    }
    /**
     * @notice insert uint8 value to 1-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint8 to add
     */
    function pushUint8(Builder memory self, uint8 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 8;
        }
    }

    /**
     * @notice remove last 1-byte segment from bytes and return as uint8
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint8 derived from bytes
     */
    function popUint8(
        Builder memory self
    ) internal pure returns (uint8 element) {
        unchecked {
            self._size -= 8;
            bytes32 mask = MASK_01;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint8(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 1-byte segment from bytes and return as uint8
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint8 derived from bytes
     */
    function shiftUint8(
        Builder memory self
    ) internal pure returns (uint8 element) {
        unchecked {
            bytes32 mask = MASK_01;
            bytes32 elementBytes = self._data & mask;
            element = uint8(Bytes32.toUint256(elementBytes));
            self._data >>= 8;
            self._size -= 8;
        }
    }

    /**
     * @notice insert uint8 value to 1-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint8 to add
     */
    function unshiftUint8(Builder memory self, uint8 element) internal pure {
        unchecked {
            self._data = (self._data << 8) | Uint256.toBytes32(element);
            self._size += 8;
        }
    }
    /**
     * @notice insert bool value to 1-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bool to add
     */
    function pushBool(Builder memory self, bool element) internal pure {
        unchecked {
            self._data |= Bool.toBytes32(element) << self._size;
            self._size += 8;
        }
    }

    /**
     * @notice remove last 1-byte segment from bytes and return as bool
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bool derived from bytes
     */
    function popBool(Builder memory self) internal pure returns (bool element) {
        unchecked {
            self._size -= 8;
            bytes32 mask = MASK_01;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = Bytes32.toBool(elementBytes);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 1-byte segment from bytes and return as bool
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bool derived from bytes
     */
    function shiftBool(
        Builder memory self
    ) internal pure returns (bool element) {
        unchecked {
            bytes32 mask = MASK_01;
            bytes32 elementBytes = self._data & mask;
            element = Bytes32.toBool(elementBytes);
            self._data >>= 8;
            self._size -= 8;
        }
    }

    /**
     * @notice insert bool value to 1-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bool to add
     */
    function unshiftBool(Builder memory self, bool element) internal pure {
        unchecked {
            self._data = (self._data << 8) | Bool.toBytes32(element);
            self._size += 8;
        }
    }
    /**
     * @notice insert bytes2 value to 2-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes2 to add
     */
    function pushBytes2(Builder memory self, bytes2 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 240) << self._size;
            self._size += 16;
        }
    }

    /**
     * @notice remove last 2-byte segment from bytes and return as bytes2
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes2 derived from bytes
     */
    function popBytes2(
        Builder memory self
    ) internal pure returns (bytes2 element) {
        unchecked {
            self._size -= 16;
            bytes32 mask = MASK_02;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes2(elementBytes << 240);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 2-byte segment from bytes and return as bytes2
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes2 derived from bytes
     */
    function shiftBytes2(
        Builder memory self
    ) internal pure returns (bytes2 element) {
        unchecked {
            bytes32 mask = MASK_02;
            bytes32 elementBytes = self._data & mask;
            element = bytes2(elementBytes << 240);
            self._data >>= 16;
            self._size -= 16;
        }
    }

    /**
     * @notice insert bytes2 value to 2-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes2 to add
     */
    function unshiftBytes2(Builder memory self, bytes2 element) internal pure {
        unchecked {
            self._data = (self._data << 16) | (bytes32(element) >> 240);
            self._size += 16;
        }
    }
    /**
     * @notice insert int16 value to 2-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int16 to add
     */
    function pushInt16(Builder memory self, int16 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 240)) <<
                self._size;
            self._size += 16;
        }
    }

    /**
     * @notice remove last 2-byte segment from bytes and return as int16
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int16 derived from bytes
     */
    function popInt16(
        Builder memory self
    ) internal pure returns (int16 element) {
        unchecked {
            self._size -= 16;
            bytes32 mask = MASK_02;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int16(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 2-byte segment from bytes and return as int16
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int16 derived from bytes
     */
    function shiftInt16(
        Builder memory self
    ) internal pure returns (int16 element) {
        unchecked {
            bytes32 mask = MASK_02;
            bytes32 elementBytes = self._data & mask;
            element = int16(Bytes32.toInt256(elementBytes));
            self._data >>= 16;
            self._size -= 16;
        }
    }

    /**
     * @notice insert int16 value to 2-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int16 to add
     */
    function unshiftInt16(Builder memory self, int16 element) internal pure {
        unchecked {
            self._data =
                (self._data << 16) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 240));
            self._size += 16;
        }
    }
    /**
     * @notice insert uint16 value to 2-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint16 to add
     */
    function pushUint16(Builder memory self, uint16 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 16;
        }
    }

    /**
     * @notice remove last 2-byte segment from bytes and return as uint16
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint16 derived from bytes
     */
    function popUint16(
        Builder memory self
    ) internal pure returns (uint16 element) {
        unchecked {
            self._size -= 16;
            bytes32 mask = MASK_02;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint16(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 2-byte segment from bytes and return as uint16
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint16 derived from bytes
     */
    function shiftUint16(
        Builder memory self
    ) internal pure returns (uint16 element) {
        unchecked {
            bytes32 mask = MASK_02;
            bytes32 elementBytes = self._data & mask;
            element = uint16(Bytes32.toUint256(elementBytes));
            self._data >>= 16;
            self._size -= 16;
        }
    }

    /**
     * @notice insert uint16 value to 2-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint16 to add
     */
    function unshiftUint16(Builder memory self, uint16 element) internal pure {
        unchecked {
            self._data = (self._data << 16) | Uint256.toBytes32(element);
            self._size += 16;
        }
    }
    /**
     * @notice insert bytes3 value to 3-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes3 to add
     */
    function pushBytes3(Builder memory self, bytes3 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 232) << self._size;
            self._size += 24;
        }
    }

    /**
     * @notice remove last 3-byte segment from bytes and return as bytes3
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes3 derived from bytes
     */
    function popBytes3(
        Builder memory self
    ) internal pure returns (bytes3 element) {
        unchecked {
            self._size -= 24;
            bytes32 mask = MASK_03;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes3(elementBytes << 232);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 3-byte segment from bytes and return as bytes3
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes3 derived from bytes
     */
    function shiftBytes3(
        Builder memory self
    ) internal pure returns (bytes3 element) {
        unchecked {
            bytes32 mask = MASK_03;
            bytes32 elementBytes = self._data & mask;
            element = bytes3(elementBytes << 232);
            self._data >>= 24;
            self._size -= 24;
        }
    }

    /**
     * @notice insert bytes3 value to 3-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes3 to add
     */
    function unshiftBytes3(Builder memory self, bytes3 element) internal pure {
        unchecked {
            self._data = (self._data << 24) | (bytes32(element) >> 232);
            self._size += 24;
        }
    }
    /**
     * @notice insert int24 value to 3-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int24 to add
     */
    function pushInt24(Builder memory self, int24 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 232)) <<
                self._size;
            self._size += 24;
        }
    }

    /**
     * @notice remove last 3-byte segment from bytes and return as int24
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int24 derived from bytes
     */
    function popInt24(
        Builder memory self
    ) internal pure returns (int24 element) {
        unchecked {
            self._size -= 24;
            bytes32 mask = MASK_03;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int24(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 3-byte segment from bytes and return as int24
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int24 derived from bytes
     */
    function shiftInt24(
        Builder memory self
    ) internal pure returns (int24 element) {
        unchecked {
            bytes32 mask = MASK_03;
            bytes32 elementBytes = self._data & mask;
            element = int24(Bytes32.toInt256(elementBytes));
            self._data >>= 24;
            self._size -= 24;
        }
    }

    /**
     * @notice insert int24 value to 3-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int24 to add
     */
    function unshiftInt24(Builder memory self, int24 element) internal pure {
        unchecked {
            self._data =
                (self._data << 24) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 232));
            self._size += 24;
        }
    }
    /**
     * @notice insert uint24 value to 3-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint24 to add
     */
    function pushUint24(Builder memory self, uint24 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 24;
        }
    }

    /**
     * @notice remove last 3-byte segment from bytes and return as uint24
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint24 derived from bytes
     */
    function popUint24(
        Builder memory self
    ) internal pure returns (uint24 element) {
        unchecked {
            self._size -= 24;
            bytes32 mask = MASK_03;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint24(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 3-byte segment from bytes and return as uint24
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint24 derived from bytes
     */
    function shiftUint24(
        Builder memory self
    ) internal pure returns (uint24 element) {
        unchecked {
            bytes32 mask = MASK_03;
            bytes32 elementBytes = self._data & mask;
            element = uint24(Bytes32.toUint256(elementBytes));
            self._data >>= 24;
            self._size -= 24;
        }
    }

    /**
     * @notice insert uint24 value to 3-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint24 to add
     */
    function unshiftUint24(Builder memory self, uint24 element) internal pure {
        unchecked {
            self._data = (self._data << 24) | Uint256.toBytes32(element);
            self._size += 24;
        }
    }
    /**
     * @notice insert bytes4 value to 4-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes4 to add
     */
    function pushBytes4(Builder memory self, bytes4 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 224) << self._size;
            self._size += 32;
        }
    }

    /**
     * @notice remove last 4-byte segment from bytes and return as bytes4
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes4 derived from bytes
     */
    function popBytes4(
        Builder memory self
    ) internal pure returns (bytes4 element) {
        unchecked {
            self._size -= 32;
            bytes32 mask = MASK_04;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes4(elementBytes << 224);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 4-byte segment from bytes and return as bytes4
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes4 derived from bytes
     */
    function shiftBytes4(
        Builder memory self
    ) internal pure returns (bytes4 element) {
        unchecked {
            bytes32 mask = MASK_04;
            bytes32 elementBytes = self._data & mask;
            element = bytes4(elementBytes << 224);
            self._data >>= 32;
            self._size -= 32;
        }
    }

    /**
     * @notice insert bytes4 value to 4-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes4 to add
     */
    function unshiftBytes4(Builder memory self, bytes4 element) internal pure {
        unchecked {
            self._data = (self._data << 32) | (bytes32(element) >> 224);
            self._size += 32;
        }
    }
    /**
     * @notice insert int32 value to 4-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int32 to add
     */
    function pushInt32(Builder memory self, int32 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 224)) <<
                self._size;
            self._size += 32;
        }
    }

    /**
     * @notice remove last 4-byte segment from bytes and return as int32
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int32 derived from bytes
     */
    function popInt32(
        Builder memory self
    ) internal pure returns (int32 element) {
        unchecked {
            self._size -= 32;
            bytes32 mask = MASK_04;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int32(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 4-byte segment from bytes and return as int32
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int32 derived from bytes
     */
    function shiftInt32(
        Builder memory self
    ) internal pure returns (int32 element) {
        unchecked {
            bytes32 mask = MASK_04;
            bytes32 elementBytes = self._data & mask;
            element = int32(Bytes32.toInt256(elementBytes));
            self._data >>= 32;
            self._size -= 32;
        }
    }

    /**
     * @notice insert int32 value to 4-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int32 to add
     */
    function unshiftInt32(Builder memory self, int32 element) internal pure {
        unchecked {
            self._data =
                (self._data << 32) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 224));
            self._size += 32;
        }
    }
    /**
     * @notice insert uint32 value to 4-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint32 to add
     */
    function pushUint32(Builder memory self, uint32 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 32;
        }
    }

    /**
     * @notice remove last 4-byte segment from bytes and return as uint32
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint32 derived from bytes
     */
    function popUint32(
        Builder memory self
    ) internal pure returns (uint32 element) {
        unchecked {
            self._size -= 32;
            bytes32 mask = MASK_04;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint32(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 4-byte segment from bytes and return as uint32
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint32 derived from bytes
     */
    function shiftUint32(
        Builder memory self
    ) internal pure returns (uint32 element) {
        unchecked {
            bytes32 mask = MASK_04;
            bytes32 elementBytes = self._data & mask;
            element = uint32(Bytes32.toUint256(elementBytes));
            self._data >>= 32;
            self._size -= 32;
        }
    }

    /**
     * @notice insert uint32 value to 4-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint32 to add
     */
    function unshiftUint32(Builder memory self, uint32 element) internal pure {
        unchecked {
            self._data = (self._data << 32) | Uint256.toBytes32(element);
            self._size += 32;
        }
    }
    /**
     * @notice insert bytes5 value to 5-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes5 to add
     */
    function pushBytes5(Builder memory self, bytes5 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 216) << self._size;
            self._size += 40;
        }
    }

    /**
     * @notice remove last 5-byte segment from bytes and return as bytes5
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes5 derived from bytes
     */
    function popBytes5(
        Builder memory self
    ) internal pure returns (bytes5 element) {
        unchecked {
            self._size -= 40;
            bytes32 mask = MASK_05;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes5(elementBytes << 216);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 5-byte segment from bytes and return as bytes5
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes5 derived from bytes
     */
    function shiftBytes5(
        Builder memory self
    ) internal pure returns (bytes5 element) {
        unchecked {
            bytes32 mask = MASK_05;
            bytes32 elementBytes = self._data & mask;
            element = bytes5(elementBytes << 216);
            self._data >>= 40;
            self._size -= 40;
        }
    }

    /**
     * @notice insert bytes5 value to 5-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes5 to add
     */
    function unshiftBytes5(Builder memory self, bytes5 element) internal pure {
        unchecked {
            self._data = (self._data << 40) | (bytes32(element) >> 216);
            self._size += 40;
        }
    }
    /**
     * @notice insert int40 value to 5-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int40 to add
     */
    function pushInt40(Builder memory self, int40 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 216)) <<
                self._size;
            self._size += 40;
        }
    }

    /**
     * @notice remove last 5-byte segment from bytes and return as int40
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int40 derived from bytes
     */
    function popInt40(
        Builder memory self
    ) internal pure returns (int40 element) {
        unchecked {
            self._size -= 40;
            bytes32 mask = MASK_05;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int40(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 5-byte segment from bytes and return as int40
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int40 derived from bytes
     */
    function shiftInt40(
        Builder memory self
    ) internal pure returns (int40 element) {
        unchecked {
            bytes32 mask = MASK_05;
            bytes32 elementBytes = self._data & mask;
            element = int40(Bytes32.toInt256(elementBytes));
            self._data >>= 40;
            self._size -= 40;
        }
    }

    /**
     * @notice insert int40 value to 5-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int40 to add
     */
    function unshiftInt40(Builder memory self, int40 element) internal pure {
        unchecked {
            self._data =
                (self._data << 40) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 216));
            self._size += 40;
        }
    }
    /**
     * @notice insert uint40 value to 5-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint40 to add
     */
    function pushUint40(Builder memory self, uint40 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 40;
        }
    }

    /**
     * @notice remove last 5-byte segment from bytes and return as uint40
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint40 derived from bytes
     */
    function popUint40(
        Builder memory self
    ) internal pure returns (uint40 element) {
        unchecked {
            self._size -= 40;
            bytes32 mask = MASK_05;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint40(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 5-byte segment from bytes and return as uint40
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint40 derived from bytes
     */
    function shiftUint40(
        Builder memory self
    ) internal pure returns (uint40 element) {
        unchecked {
            bytes32 mask = MASK_05;
            bytes32 elementBytes = self._data & mask;
            element = uint40(Bytes32.toUint256(elementBytes));
            self._data >>= 40;
            self._size -= 40;
        }
    }

    /**
     * @notice insert uint40 value to 5-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint40 to add
     */
    function unshiftUint40(Builder memory self, uint40 element) internal pure {
        unchecked {
            self._data = (self._data << 40) | Uint256.toBytes32(element);
            self._size += 40;
        }
    }
    /**
     * @notice insert bytes6 value to 6-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes6 to add
     */
    function pushBytes6(Builder memory self, bytes6 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 208) << self._size;
            self._size += 48;
        }
    }

    /**
     * @notice remove last 6-byte segment from bytes and return as bytes6
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes6 derived from bytes
     */
    function popBytes6(
        Builder memory self
    ) internal pure returns (bytes6 element) {
        unchecked {
            self._size -= 48;
            bytes32 mask = MASK_06;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes6(elementBytes << 208);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 6-byte segment from bytes and return as bytes6
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes6 derived from bytes
     */
    function shiftBytes6(
        Builder memory self
    ) internal pure returns (bytes6 element) {
        unchecked {
            bytes32 mask = MASK_06;
            bytes32 elementBytes = self._data & mask;
            element = bytes6(elementBytes << 208);
            self._data >>= 48;
            self._size -= 48;
        }
    }

    /**
     * @notice insert bytes6 value to 6-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes6 to add
     */
    function unshiftBytes6(Builder memory self, bytes6 element) internal pure {
        unchecked {
            self._data = (self._data << 48) | (bytes32(element) >> 208);
            self._size += 48;
        }
    }
    /**
     * @notice insert int48 value to 6-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int48 to add
     */
    function pushInt48(Builder memory self, int48 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 208)) <<
                self._size;
            self._size += 48;
        }
    }

    /**
     * @notice remove last 6-byte segment from bytes and return as int48
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int48 derived from bytes
     */
    function popInt48(
        Builder memory self
    ) internal pure returns (int48 element) {
        unchecked {
            self._size -= 48;
            bytes32 mask = MASK_06;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int48(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 6-byte segment from bytes and return as int48
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int48 derived from bytes
     */
    function shiftInt48(
        Builder memory self
    ) internal pure returns (int48 element) {
        unchecked {
            bytes32 mask = MASK_06;
            bytes32 elementBytes = self._data & mask;
            element = int48(Bytes32.toInt256(elementBytes));
            self._data >>= 48;
            self._size -= 48;
        }
    }

    /**
     * @notice insert int48 value to 6-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int48 to add
     */
    function unshiftInt48(Builder memory self, int48 element) internal pure {
        unchecked {
            self._data =
                (self._data << 48) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 208));
            self._size += 48;
        }
    }
    /**
     * @notice insert uint48 value to 6-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint48 to add
     */
    function pushUint48(Builder memory self, uint48 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 48;
        }
    }

    /**
     * @notice remove last 6-byte segment from bytes and return as uint48
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint48 derived from bytes
     */
    function popUint48(
        Builder memory self
    ) internal pure returns (uint48 element) {
        unchecked {
            self._size -= 48;
            bytes32 mask = MASK_06;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint48(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 6-byte segment from bytes and return as uint48
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint48 derived from bytes
     */
    function shiftUint48(
        Builder memory self
    ) internal pure returns (uint48 element) {
        unchecked {
            bytes32 mask = MASK_06;
            bytes32 elementBytes = self._data & mask;
            element = uint48(Bytes32.toUint256(elementBytes));
            self._data >>= 48;
            self._size -= 48;
        }
    }

    /**
     * @notice insert uint48 value to 6-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint48 to add
     */
    function unshiftUint48(Builder memory self, uint48 element) internal pure {
        unchecked {
            self._data = (self._data << 48) | Uint256.toBytes32(element);
            self._size += 48;
        }
    }
    /**
     * @notice insert bytes7 value to 7-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes7 to add
     */
    function pushBytes7(Builder memory self, bytes7 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 200) << self._size;
            self._size += 56;
        }
    }

    /**
     * @notice remove last 7-byte segment from bytes and return as bytes7
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes7 derived from bytes
     */
    function popBytes7(
        Builder memory self
    ) internal pure returns (bytes7 element) {
        unchecked {
            self._size -= 56;
            bytes32 mask = MASK_07;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes7(elementBytes << 200);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 7-byte segment from bytes and return as bytes7
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes7 derived from bytes
     */
    function shiftBytes7(
        Builder memory self
    ) internal pure returns (bytes7 element) {
        unchecked {
            bytes32 mask = MASK_07;
            bytes32 elementBytes = self._data & mask;
            element = bytes7(elementBytes << 200);
            self._data >>= 56;
            self._size -= 56;
        }
    }

    /**
     * @notice insert bytes7 value to 7-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes7 to add
     */
    function unshiftBytes7(Builder memory self, bytes7 element) internal pure {
        unchecked {
            self._data = (self._data << 56) | (bytes32(element) >> 200);
            self._size += 56;
        }
    }
    /**
     * @notice insert int56 value to 7-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int56 to add
     */
    function pushInt56(Builder memory self, int56 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 200)) <<
                self._size;
            self._size += 56;
        }
    }

    /**
     * @notice remove last 7-byte segment from bytes and return as int56
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int56 derived from bytes
     */
    function popInt56(
        Builder memory self
    ) internal pure returns (int56 element) {
        unchecked {
            self._size -= 56;
            bytes32 mask = MASK_07;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int56(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 7-byte segment from bytes and return as int56
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int56 derived from bytes
     */
    function shiftInt56(
        Builder memory self
    ) internal pure returns (int56 element) {
        unchecked {
            bytes32 mask = MASK_07;
            bytes32 elementBytes = self._data & mask;
            element = int56(Bytes32.toInt256(elementBytes));
            self._data >>= 56;
            self._size -= 56;
        }
    }

    /**
     * @notice insert int56 value to 7-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int56 to add
     */
    function unshiftInt56(Builder memory self, int56 element) internal pure {
        unchecked {
            self._data =
                (self._data << 56) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 200));
            self._size += 56;
        }
    }
    /**
     * @notice insert uint56 value to 7-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint56 to add
     */
    function pushUint56(Builder memory self, uint56 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 56;
        }
    }

    /**
     * @notice remove last 7-byte segment from bytes and return as uint56
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint56 derived from bytes
     */
    function popUint56(
        Builder memory self
    ) internal pure returns (uint56 element) {
        unchecked {
            self._size -= 56;
            bytes32 mask = MASK_07;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint56(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 7-byte segment from bytes and return as uint56
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint56 derived from bytes
     */
    function shiftUint56(
        Builder memory self
    ) internal pure returns (uint56 element) {
        unchecked {
            bytes32 mask = MASK_07;
            bytes32 elementBytes = self._data & mask;
            element = uint56(Bytes32.toUint256(elementBytes));
            self._data >>= 56;
            self._size -= 56;
        }
    }

    /**
     * @notice insert uint56 value to 7-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint56 to add
     */
    function unshiftUint56(Builder memory self, uint56 element) internal pure {
        unchecked {
            self._data = (self._data << 56) | Uint256.toBytes32(element);
            self._size += 56;
        }
    }
    /**
     * @notice insert bytes8 value to 8-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes8 to add
     */
    function pushBytes8(Builder memory self, bytes8 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 192) << self._size;
            self._size += 64;
        }
    }

    /**
     * @notice remove last 8-byte segment from bytes and return as bytes8
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes8 derived from bytes
     */
    function popBytes8(
        Builder memory self
    ) internal pure returns (bytes8 element) {
        unchecked {
            self._size -= 64;
            bytes32 mask = MASK_08;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes8(elementBytes << 192);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 8-byte segment from bytes and return as bytes8
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes8 derived from bytes
     */
    function shiftBytes8(
        Builder memory self
    ) internal pure returns (bytes8 element) {
        unchecked {
            bytes32 mask = MASK_08;
            bytes32 elementBytes = self._data & mask;
            element = bytes8(elementBytes << 192);
            self._data >>= 64;
            self._size -= 64;
        }
    }

    /**
     * @notice insert bytes8 value to 8-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes8 to add
     */
    function unshiftBytes8(Builder memory self, bytes8 element) internal pure {
        unchecked {
            self._data = (self._data << 64) | (bytes32(element) >> 192);
            self._size += 64;
        }
    }
    /**
     * @notice insert int64 value to 8-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int64 to add
     */
    function pushInt64(Builder memory self, int64 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 192)) <<
                self._size;
            self._size += 64;
        }
    }

    /**
     * @notice remove last 8-byte segment from bytes and return as int64
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int64 derived from bytes
     */
    function popInt64(
        Builder memory self
    ) internal pure returns (int64 element) {
        unchecked {
            self._size -= 64;
            bytes32 mask = MASK_08;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int64(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 8-byte segment from bytes and return as int64
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int64 derived from bytes
     */
    function shiftInt64(
        Builder memory self
    ) internal pure returns (int64 element) {
        unchecked {
            bytes32 mask = MASK_08;
            bytes32 elementBytes = self._data & mask;
            element = int64(Bytes32.toInt256(elementBytes));
            self._data >>= 64;
            self._size -= 64;
        }
    }

    /**
     * @notice insert int64 value to 8-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int64 to add
     */
    function unshiftInt64(Builder memory self, int64 element) internal pure {
        unchecked {
            self._data =
                (self._data << 64) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 192));
            self._size += 64;
        }
    }
    /**
     * @notice insert uint64 value to 8-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint64 to add
     */
    function pushUint64(Builder memory self, uint64 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 64;
        }
    }

    /**
     * @notice remove last 8-byte segment from bytes and return as uint64
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint64 derived from bytes
     */
    function popUint64(
        Builder memory self
    ) internal pure returns (uint64 element) {
        unchecked {
            self._size -= 64;
            bytes32 mask = MASK_08;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint64(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 8-byte segment from bytes and return as uint64
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint64 derived from bytes
     */
    function shiftUint64(
        Builder memory self
    ) internal pure returns (uint64 element) {
        unchecked {
            bytes32 mask = MASK_08;
            bytes32 elementBytes = self._data & mask;
            element = uint64(Bytes32.toUint256(elementBytes));
            self._data >>= 64;
            self._size -= 64;
        }
    }

    /**
     * @notice insert uint64 value to 8-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint64 to add
     */
    function unshiftUint64(Builder memory self, uint64 element) internal pure {
        unchecked {
            self._data = (self._data << 64) | Uint256.toBytes32(element);
            self._size += 64;
        }
    }
    /**
     * @notice insert bytes9 value to 9-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes9 to add
     */
    function pushBytes9(Builder memory self, bytes9 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 184) << self._size;
            self._size += 72;
        }
    }

    /**
     * @notice remove last 9-byte segment from bytes and return as bytes9
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes9 derived from bytes
     */
    function popBytes9(
        Builder memory self
    ) internal pure returns (bytes9 element) {
        unchecked {
            self._size -= 72;
            bytes32 mask = MASK_09;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes9(elementBytes << 184);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 9-byte segment from bytes and return as bytes9
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes9 derived from bytes
     */
    function shiftBytes9(
        Builder memory self
    ) internal pure returns (bytes9 element) {
        unchecked {
            bytes32 mask = MASK_09;
            bytes32 elementBytes = self._data & mask;
            element = bytes9(elementBytes << 184);
            self._data >>= 72;
            self._size -= 72;
        }
    }

    /**
     * @notice insert bytes9 value to 9-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes9 to add
     */
    function unshiftBytes9(Builder memory self, bytes9 element) internal pure {
        unchecked {
            self._data = (self._data << 72) | (bytes32(element) >> 184);
            self._size += 72;
        }
    }
    /**
     * @notice insert int72 value to 9-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int72 to add
     */
    function pushInt72(Builder memory self, int72 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 184)) <<
                self._size;
            self._size += 72;
        }
    }

    /**
     * @notice remove last 9-byte segment from bytes and return as int72
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int72 derived from bytes
     */
    function popInt72(
        Builder memory self
    ) internal pure returns (int72 element) {
        unchecked {
            self._size -= 72;
            bytes32 mask = MASK_09;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int72(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 9-byte segment from bytes and return as int72
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int72 derived from bytes
     */
    function shiftInt72(
        Builder memory self
    ) internal pure returns (int72 element) {
        unchecked {
            bytes32 mask = MASK_09;
            bytes32 elementBytes = self._data & mask;
            element = int72(Bytes32.toInt256(elementBytes));
            self._data >>= 72;
            self._size -= 72;
        }
    }

    /**
     * @notice insert int72 value to 9-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int72 to add
     */
    function unshiftInt72(Builder memory self, int72 element) internal pure {
        unchecked {
            self._data =
                (self._data << 72) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 184));
            self._size += 72;
        }
    }
    /**
     * @notice insert uint72 value to 9-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint72 to add
     */
    function pushUint72(Builder memory self, uint72 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 72;
        }
    }

    /**
     * @notice remove last 9-byte segment from bytes and return as uint72
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint72 derived from bytes
     */
    function popUint72(
        Builder memory self
    ) internal pure returns (uint72 element) {
        unchecked {
            self._size -= 72;
            bytes32 mask = MASK_09;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint72(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 9-byte segment from bytes and return as uint72
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint72 derived from bytes
     */
    function shiftUint72(
        Builder memory self
    ) internal pure returns (uint72 element) {
        unchecked {
            bytes32 mask = MASK_09;
            bytes32 elementBytes = self._data & mask;
            element = uint72(Bytes32.toUint256(elementBytes));
            self._data >>= 72;
            self._size -= 72;
        }
    }

    /**
     * @notice insert uint72 value to 9-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint72 to add
     */
    function unshiftUint72(Builder memory self, uint72 element) internal pure {
        unchecked {
            self._data = (self._data << 72) | Uint256.toBytes32(element);
            self._size += 72;
        }
    }
    /**
     * @notice insert bytes10 value to 10-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes10 to add
     */
    function pushBytes10(Builder memory self, bytes10 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 176) << self._size;
            self._size += 80;
        }
    }

    /**
     * @notice remove last 10-byte segment from bytes and return as bytes10
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes10 derived from bytes
     */
    function popBytes10(
        Builder memory self
    ) internal pure returns (bytes10 element) {
        unchecked {
            self._size -= 80;
            bytes32 mask = MASK_10;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes10(elementBytes << 176);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 10-byte segment from bytes and return as bytes10
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes10 derived from bytes
     */
    function shiftBytes10(
        Builder memory self
    ) internal pure returns (bytes10 element) {
        unchecked {
            bytes32 mask = MASK_10;
            bytes32 elementBytes = self._data & mask;
            element = bytes10(elementBytes << 176);
            self._data >>= 80;
            self._size -= 80;
        }
    }

    /**
     * @notice insert bytes10 value to 10-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes10 to add
     */
    function unshiftBytes10(
        Builder memory self,
        bytes10 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 80) | (bytes32(element) >> 176);
            self._size += 80;
        }
    }
    /**
     * @notice insert int80 value to 10-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int80 to add
     */
    function pushInt80(Builder memory self, int80 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 176)) <<
                self._size;
            self._size += 80;
        }
    }

    /**
     * @notice remove last 10-byte segment from bytes and return as int80
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int80 derived from bytes
     */
    function popInt80(
        Builder memory self
    ) internal pure returns (int80 element) {
        unchecked {
            self._size -= 80;
            bytes32 mask = MASK_10;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int80(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 10-byte segment from bytes and return as int80
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int80 derived from bytes
     */
    function shiftInt80(
        Builder memory self
    ) internal pure returns (int80 element) {
        unchecked {
            bytes32 mask = MASK_10;
            bytes32 elementBytes = self._data & mask;
            element = int80(Bytes32.toInt256(elementBytes));
            self._data >>= 80;
            self._size -= 80;
        }
    }

    /**
     * @notice insert int80 value to 10-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int80 to add
     */
    function unshiftInt80(Builder memory self, int80 element) internal pure {
        unchecked {
            self._data =
                (self._data << 80) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 176));
            self._size += 80;
        }
    }
    /**
     * @notice insert uint80 value to 10-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint80 to add
     */
    function pushUint80(Builder memory self, uint80 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 80;
        }
    }

    /**
     * @notice remove last 10-byte segment from bytes and return as uint80
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint80 derived from bytes
     */
    function popUint80(
        Builder memory self
    ) internal pure returns (uint80 element) {
        unchecked {
            self._size -= 80;
            bytes32 mask = MASK_10;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint80(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 10-byte segment from bytes and return as uint80
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint80 derived from bytes
     */
    function shiftUint80(
        Builder memory self
    ) internal pure returns (uint80 element) {
        unchecked {
            bytes32 mask = MASK_10;
            bytes32 elementBytes = self._data & mask;
            element = uint80(Bytes32.toUint256(elementBytes));
            self._data >>= 80;
            self._size -= 80;
        }
    }

    /**
     * @notice insert uint80 value to 10-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint80 to add
     */
    function unshiftUint80(Builder memory self, uint80 element) internal pure {
        unchecked {
            self._data = (self._data << 80) | Uint256.toBytes32(element);
            self._size += 80;
        }
    }
    /**
     * @notice insert bytes11 value to 11-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes11 to add
     */
    function pushBytes11(Builder memory self, bytes11 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 168) << self._size;
            self._size += 88;
        }
    }

    /**
     * @notice remove last 11-byte segment from bytes and return as bytes11
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes11 derived from bytes
     */
    function popBytes11(
        Builder memory self
    ) internal pure returns (bytes11 element) {
        unchecked {
            self._size -= 88;
            bytes32 mask = MASK_11;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes11(elementBytes << 168);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 11-byte segment from bytes and return as bytes11
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes11 derived from bytes
     */
    function shiftBytes11(
        Builder memory self
    ) internal pure returns (bytes11 element) {
        unchecked {
            bytes32 mask = MASK_11;
            bytes32 elementBytes = self._data & mask;
            element = bytes11(elementBytes << 168);
            self._data >>= 88;
            self._size -= 88;
        }
    }

    /**
     * @notice insert bytes11 value to 11-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes11 to add
     */
    function unshiftBytes11(
        Builder memory self,
        bytes11 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 88) | (bytes32(element) >> 168);
            self._size += 88;
        }
    }
    /**
     * @notice insert int88 value to 11-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int88 to add
     */
    function pushInt88(Builder memory self, int88 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 168)) <<
                self._size;
            self._size += 88;
        }
    }

    /**
     * @notice remove last 11-byte segment from bytes and return as int88
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int88 derived from bytes
     */
    function popInt88(
        Builder memory self
    ) internal pure returns (int88 element) {
        unchecked {
            self._size -= 88;
            bytes32 mask = MASK_11;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int88(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 11-byte segment from bytes and return as int88
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int88 derived from bytes
     */
    function shiftInt88(
        Builder memory self
    ) internal pure returns (int88 element) {
        unchecked {
            bytes32 mask = MASK_11;
            bytes32 elementBytes = self._data & mask;
            element = int88(Bytes32.toInt256(elementBytes));
            self._data >>= 88;
            self._size -= 88;
        }
    }

    /**
     * @notice insert int88 value to 11-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int88 to add
     */
    function unshiftInt88(Builder memory self, int88 element) internal pure {
        unchecked {
            self._data =
                (self._data << 88) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 168));
            self._size += 88;
        }
    }
    /**
     * @notice insert uint88 value to 11-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint88 to add
     */
    function pushUint88(Builder memory self, uint88 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 88;
        }
    }

    /**
     * @notice remove last 11-byte segment from bytes and return as uint88
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint88 derived from bytes
     */
    function popUint88(
        Builder memory self
    ) internal pure returns (uint88 element) {
        unchecked {
            self._size -= 88;
            bytes32 mask = MASK_11;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint88(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 11-byte segment from bytes and return as uint88
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint88 derived from bytes
     */
    function shiftUint88(
        Builder memory self
    ) internal pure returns (uint88 element) {
        unchecked {
            bytes32 mask = MASK_11;
            bytes32 elementBytes = self._data & mask;
            element = uint88(Bytes32.toUint256(elementBytes));
            self._data >>= 88;
            self._size -= 88;
        }
    }

    /**
     * @notice insert uint88 value to 11-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint88 to add
     */
    function unshiftUint88(Builder memory self, uint88 element) internal pure {
        unchecked {
            self._data = (self._data << 88) | Uint256.toBytes32(element);
            self._size += 88;
        }
    }
    /**
     * @notice insert bytes12 value to 12-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes12 to add
     */
    function pushBytes12(Builder memory self, bytes12 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 160) << self._size;
            self._size += 96;
        }
    }

    /**
     * @notice remove last 12-byte segment from bytes and return as bytes12
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes12 derived from bytes
     */
    function popBytes12(
        Builder memory self
    ) internal pure returns (bytes12 element) {
        unchecked {
            self._size -= 96;
            bytes32 mask = MASK_12;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes12(elementBytes << 160);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 12-byte segment from bytes and return as bytes12
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes12 derived from bytes
     */
    function shiftBytes12(
        Builder memory self
    ) internal pure returns (bytes12 element) {
        unchecked {
            bytes32 mask = MASK_12;
            bytes32 elementBytes = self._data & mask;
            element = bytes12(elementBytes << 160);
            self._data >>= 96;
            self._size -= 96;
        }
    }

    /**
     * @notice insert bytes12 value to 12-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes12 to add
     */
    function unshiftBytes12(
        Builder memory self,
        bytes12 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 96) | (bytes32(element) >> 160);
            self._size += 96;
        }
    }
    /**
     * @notice insert int96 value to 12-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int96 to add
     */
    function pushInt96(Builder memory self, int96 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 160)) <<
                self._size;
            self._size += 96;
        }
    }

    /**
     * @notice remove last 12-byte segment from bytes and return as int96
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int96 derived from bytes
     */
    function popInt96(
        Builder memory self
    ) internal pure returns (int96 element) {
        unchecked {
            self._size -= 96;
            bytes32 mask = MASK_12;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int96(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 12-byte segment from bytes and return as int96
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int96 derived from bytes
     */
    function shiftInt96(
        Builder memory self
    ) internal pure returns (int96 element) {
        unchecked {
            bytes32 mask = MASK_12;
            bytes32 elementBytes = self._data & mask;
            element = int96(Bytes32.toInt256(elementBytes));
            self._data >>= 96;
            self._size -= 96;
        }
    }

    /**
     * @notice insert int96 value to 12-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int96 to add
     */
    function unshiftInt96(Builder memory self, int96 element) internal pure {
        unchecked {
            self._data =
                (self._data << 96) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 160));
            self._size += 96;
        }
    }
    /**
     * @notice insert uint96 value to 12-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint96 to add
     */
    function pushUint96(Builder memory self, uint96 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 96;
        }
    }

    /**
     * @notice remove last 12-byte segment from bytes and return as uint96
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint96 derived from bytes
     */
    function popUint96(
        Builder memory self
    ) internal pure returns (uint96 element) {
        unchecked {
            self._size -= 96;
            bytes32 mask = MASK_12;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint96(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 12-byte segment from bytes and return as uint96
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint96 derived from bytes
     */
    function shiftUint96(
        Builder memory self
    ) internal pure returns (uint96 element) {
        unchecked {
            bytes32 mask = MASK_12;
            bytes32 elementBytes = self._data & mask;
            element = uint96(Bytes32.toUint256(elementBytes));
            self._data >>= 96;
            self._size -= 96;
        }
    }

    /**
     * @notice insert uint96 value to 12-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint96 to add
     */
    function unshiftUint96(Builder memory self, uint96 element) internal pure {
        unchecked {
            self._data = (self._data << 96) | Uint256.toBytes32(element);
            self._size += 96;
        }
    }
    /**
     * @notice insert bytes13 value to 13-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes13 to add
     */
    function pushBytes13(Builder memory self, bytes13 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 152) << self._size;
            self._size += 104;
        }
    }

    /**
     * @notice remove last 13-byte segment from bytes and return as bytes13
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes13 derived from bytes
     */
    function popBytes13(
        Builder memory self
    ) internal pure returns (bytes13 element) {
        unchecked {
            self._size -= 104;
            bytes32 mask = MASK_13;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes13(elementBytes << 152);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 13-byte segment from bytes and return as bytes13
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes13 derived from bytes
     */
    function shiftBytes13(
        Builder memory self
    ) internal pure returns (bytes13 element) {
        unchecked {
            bytes32 mask = MASK_13;
            bytes32 elementBytes = self._data & mask;
            element = bytes13(elementBytes << 152);
            self._data >>= 104;
            self._size -= 104;
        }
    }

    /**
     * @notice insert bytes13 value to 13-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes13 to add
     */
    function unshiftBytes13(
        Builder memory self,
        bytes13 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 104) | (bytes32(element) >> 152);
            self._size += 104;
        }
    }
    /**
     * @notice insert int104 value to 13-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int104 to add
     */
    function pushInt104(Builder memory self, int104 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 152)) <<
                self._size;
            self._size += 104;
        }
    }

    /**
     * @notice remove last 13-byte segment from bytes and return as int104
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int104 derived from bytes
     */
    function popInt104(
        Builder memory self
    ) internal pure returns (int104 element) {
        unchecked {
            self._size -= 104;
            bytes32 mask = MASK_13;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int104(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 13-byte segment from bytes and return as int104
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int104 derived from bytes
     */
    function shiftInt104(
        Builder memory self
    ) internal pure returns (int104 element) {
        unchecked {
            bytes32 mask = MASK_13;
            bytes32 elementBytes = self._data & mask;
            element = int104(Bytes32.toInt256(elementBytes));
            self._data >>= 104;
            self._size -= 104;
        }
    }

    /**
     * @notice insert int104 value to 13-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int104 to add
     */
    function unshiftInt104(Builder memory self, int104 element) internal pure {
        unchecked {
            self._data =
                (self._data << 104) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 152));
            self._size += 104;
        }
    }
    /**
     * @notice insert uint104 value to 13-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint104 to add
     */
    function pushUint104(Builder memory self, uint104 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 104;
        }
    }

    /**
     * @notice remove last 13-byte segment from bytes and return as uint104
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint104 derived from bytes
     */
    function popUint104(
        Builder memory self
    ) internal pure returns (uint104 element) {
        unchecked {
            self._size -= 104;
            bytes32 mask = MASK_13;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint104(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 13-byte segment from bytes and return as uint104
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint104 derived from bytes
     */
    function shiftUint104(
        Builder memory self
    ) internal pure returns (uint104 element) {
        unchecked {
            bytes32 mask = MASK_13;
            bytes32 elementBytes = self._data & mask;
            element = uint104(Bytes32.toUint256(elementBytes));
            self._data >>= 104;
            self._size -= 104;
        }
    }

    /**
     * @notice insert uint104 value to 13-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint104 to add
     */
    function unshiftUint104(
        Builder memory self,
        uint104 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 104) | Uint256.toBytes32(element);
            self._size += 104;
        }
    }
    /**
     * @notice insert bytes14 value to 14-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes14 to add
     */
    function pushBytes14(Builder memory self, bytes14 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 144) << self._size;
            self._size += 112;
        }
    }

    /**
     * @notice remove last 14-byte segment from bytes and return as bytes14
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes14 derived from bytes
     */
    function popBytes14(
        Builder memory self
    ) internal pure returns (bytes14 element) {
        unchecked {
            self._size -= 112;
            bytes32 mask = MASK_14;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes14(elementBytes << 144);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 14-byte segment from bytes and return as bytes14
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes14 derived from bytes
     */
    function shiftBytes14(
        Builder memory self
    ) internal pure returns (bytes14 element) {
        unchecked {
            bytes32 mask = MASK_14;
            bytes32 elementBytes = self._data & mask;
            element = bytes14(elementBytes << 144);
            self._data >>= 112;
            self._size -= 112;
        }
    }

    /**
     * @notice insert bytes14 value to 14-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes14 to add
     */
    function unshiftBytes14(
        Builder memory self,
        bytes14 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 112) | (bytes32(element) >> 144);
            self._size += 112;
        }
    }
    /**
     * @notice insert int112 value to 14-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int112 to add
     */
    function pushInt112(Builder memory self, int112 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 144)) <<
                self._size;
            self._size += 112;
        }
    }

    /**
     * @notice remove last 14-byte segment from bytes and return as int112
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int112 derived from bytes
     */
    function popInt112(
        Builder memory self
    ) internal pure returns (int112 element) {
        unchecked {
            self._size -= 112;
            bytes32 mask = MASK_14;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int112(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 14-byte segment from bytes and return as int112
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int112 derived from bytes
     */
    function shiftInt112(
        Builder memory self
    ) internal pure returns (int112 element) {
        unchecked {
            bytes32 mask = MASK_14;
            bytes32 elementBytes = self._data & mask;
            element = int112(Bytes32.toInt256(elementBytes));
            self._data >>= 112;
            self._size -= 112;
        }
    }

    /**
     * @notice insert int112 value to 14-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int112 to add
     */
    function unshiftInt112(Builder memory self, int112 element) internal pure {
        unchecked {
            self._data =
                (self._data << 112) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 144));
            self._size += 112;
        }
    }
    /**
     * @notice insert uint112 value to 14-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint112 to add
     */
    function pushUint112(Builder memory self, uint112 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 112;
        }
    }

    /**
     * @notice remove last 14-byte segment from bytes and return as uint112
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint112 derived from bytes
     */
    function popUint112(
        Builder memory self
    ) internal pure returns (uint112 element) {
        unchecked {
            self._size -= 112;
            bytes32 mask = MASK_14;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint112(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 14-byte segment from bytes and return as uint112
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint112 derived from bytes
     */
    function shiftUint112(
        Builder memory self
    ) internal pure returns (uint112 element) {
        unchecked {
            bytes32 mask = MASK_14;
            bytes32 elementBytes = self._data & mask;
            element = uint112(Bytes32.toUint256(elementBytes));
            self._data >>= 112;
            self._size -= 112;
        }
    }

    /**
     * @notice insert uint112 value to 14-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint112 to add
     */
    function unshiftUint112(
        Builder memory self,
        uint112 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 112) | Uint256.toBytes32(element);
            self._size += 112;
        }
    }
    /**
     * @notice insert bytes15 value to 15-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes15 to add
     */
    function pushBytes15(Builder memory self, bytes15 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 136) << self._size;
            self._size += 120;
        }
    }

    /**
     * @notice remove last 15-byte segment from bytes and return as bytes15
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes15 derived from bytes
     */
    function popBytes15(
        Builder memory self
    ) internal pure returns (bytes15 element) {
        unchecked {
            self._size -= 120;
            bytes32 mask = MASK_15;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes15(elementBytes << 136);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 15-byte segment from bytes and return as bytes15
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes15 derived from bytes
     */
    function shiftBytes15(
        Builder memory self
    ) internal pure returns (bytes15 element) {
        unchecked {
            bytes32 mask = MASK_15;
            bytes32 elementBytes = self._data & mask;
            element = bytes15(elementBytes << 136);
            self._data >>= 120;
            self._size -= 120;
        }
    }

    /**
     * @notice insert bytes15 value to 15-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes15 to add
     */
    function unshiftBytes15(
        Builder memory self,
        bytes15 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 120) | (bytes32(element) >> 136);
            self._size += 120;
        }
    }
    /**
     * @notice insert int120 value to 15-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int120 to add
     */
    function pushInt120(Builder memory self, int120 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 136)) <<
                self._size;
            self._size += 120;
        }
    }

    /**
     * @notice remove last 15-byte segment from bytes and return as int120
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int120 derived from bytes
     */
    function popInt120(
        Builder memory self
    ) internal pure returns (int120 element) {
        unchecked {
            self._size -= 120;
            bytes32 mask = MASK_15;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int120(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 15-byte segment from bytes and return as int120
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int120 derived from bytes
     */
    function shiftInt120(
        Builder memory self
    ) internal pure returns (int120 element) {
        unchecked {
            bytes32 mask = MASK_15;
            bytes32 elementBytes = self._data & mask;
            element = int120(Bytes32.toInt256(elementBytes));
            self._data >>= 120;
            self._size -= 120;
        }
    }

    /**
     * @notice insert int120 value to 15-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int120 to add
     */
    function unshiftInt120(Builder memory self, int120 element) internal pure {
        unchecked {
            self._data =
                (self._data << 120) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 136));
            self._size += 120;
        }
    }
    /**
     * @notice insert uint120 value to 15-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint120 to add
     */
    function pushUint120(Builder memory self, uint120 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 120;
        }
    }

    /**
     * @notice remove last 15-byte segment from bytes and return as uint120
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint120 derived from bytes
     */
    function popUint120(
        Builder memory self
    ) internal pure returns (uint120 element) {
        unchecked {
            self._size -= 120;
            bytes32 mask = MASK_15;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint120(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 15-byte segment from bytes and return as uint120
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint120 derived from bytes
     */
    function shiftUint120(
        Builder memory self
    ) internal pure returns (uint120 element) {
        unchecked {
            bytes32 mask = MASK_15;
            bytes32 elementBytes = self._data & mask;
            element = uint120(Bytes32.toUint256(elementBytes));
            self._data >>= 120;
            self._size -= 120;
        }
    }

    /**
     * @notice insert uint120 value to 15-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint120 to add
     */
    function unshiftUint120(
        Builder memory self,
        uint120 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 120) | Uint256.toBytes32(element);
            self._size += 120;
        }
    }
    /**
     * @notice insert bytes16 value to 16-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes16 to add
     */
    function pushBytes16(Builder memory self, bytes16 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 128) << self._size;
            self._size += 128;
        }
    }

    /**
     * @notice remove last 16-byte segment from bytes and return as bytes16
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes16 derived from bytes
     */
    function popBytes16(
        Builder memory self
    ) internal pure returns (bytes16 element) {
        unchecked {
            self._size -= 128;
            bytes32 mask = MASK_16;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes16(elementBytes << 128);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 16-byte segment from bytes and return as bytes16
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes16 derived from bytes
     */
    function shiftBytes16(
        Builder memory self
    ) internal pure returns (bytes16 element) {
        unchecked {
            bytes32 mask = MASK_16;
            bytes32 elementBytes = self._data & mask;
            element = bytes16(elementBytes << 128);
            self._data >>= 128;
            self._size -= 128;
        }
    }

    /**
     * @notice insert bytes16 value to 16-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes16 to add
     */
    function unshiftBytes16(
        Builder memory self,
        bytes16 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 128) | (bytes32(element) >> 128);
            self._size += 128;
        }
    }
    /**
     * @notice insert int128 value to 16-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int128 to add
     */
    function pushInt128(Builder memory self, int128 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 128)) <<
                self._size;
            self._size += 128;
        }
    }

    /**
     * @notice remove last 16-byte segment from bytes and return as int128
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int128 derived from bytes
     */
    function popInt128(
        Builder memory self
    ) internal pure returns (int128 element) {
        unchecked {
            self._size -= 128;
            bytes32 mask = MASK_16;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int128(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 16-byte segment from bytes and return as int128
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int128 derived from bytes
     */
    function shiftInt128(
        Builder memory self
    ) internal pure returns (int128 element) {
        unchecked {
            bytes32 mask = MASK_16;
            bytes32 elementBytes = self._data & mask;
            element = int128(Bytes32.toInt256(elementBytes));
            self._data >>= 128;
            self._size -= 128;
        }
    }

    /**
     * @notice insert int128 value to 16-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int128 to add
     */
    function unshiftInt128(Builder memory self, int128 element) internal pure {
        unchecked {
            self._data =
                (self._data << 128) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 128));
            self._size += 128;
        }
    }
    /**
     * @notice insert uint128 value to 16-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint128 to add
     */
    function pushUint128(Builder memory self, uint128 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 128;
        }
    }

    /**
     * @notice remove last 16-byte segment from bytes and return as uint128
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint128 derived from bytes
     */
    function popUint128(
        Builder memory self
    ) internal pure returns (uint128 element) {
        unchecked {
            self._size -= 128;
            bytes32 mask = MASK_16;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint128(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 16-byte segment from bytes and return as uint128
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint128 derived from bytes
     */
    function shiftUint128(
        Builder memory self
    ) internal pure returns (uint128 element) {
        unchecked {
            bytes32 mask = MASK_16;
            bytes32 elementBytes = self._data & mask;
            element = uint128(Bytes32.toUint256(elementBytes));
            self._data >>= 128;
            self._size -= 128;
        }
    }

    /**
     * @notice insert uint128 value to 16-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint128 to add
     */
    function unshiftUint128(
        Builder memory self,
        uint128 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 128) | Uint256.toBytes32(element);
            self._size += 128;
        }
    }
    /**
     * @notice insert bytes17 value to 17-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes17 to add
     */
    function pushBytes17(Builder memory self, bytes17 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 120) << self._size;
            self._size += 136;
        }
    }

    /**
     * @notice remove last 17-byte segment from bytes and return as bytes17
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes17 derived from bytes
     */
    function popBytes17(
        Builder memory self
    ) internal pure returns (bytes17 element) {
        unchecked {
            self._size -= 136;
            bytes32 mask = MASK_17;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes17(elementBytes << 120);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 17-byte segment from bytes and return as bytes17
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes17 derived from bytes
     */
    function shiftBytes17(
        Builder memory self
    ) internal pure returns (bytes17 element) {
        unchecked {
            bytes32 mask = MASK_17;
            bytes32 elementBytes = self._data & mask;
            element = bytes17(elementBytes << 120);
            self._data >>= 136;
            self._size -= 136;
        }
    }

    /**
     * @notice insert bytes17 value to 17-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes17 to add
     */
    function unshiftBytes17(
        Builder memory self,
        bytes17 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 136) | (bytes32(element) >> 120);
            self._size += 136;
        }
    }
    /**
     * @notice insert int136 value to 17-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int136 to add
     */
    function pushInt136(Builder memory self, int136 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 120)) <<
                self._size;
            self._size += 136;
        }
    }

    /**
     * @notice remove last 17-byte segment from bytes and return as int136
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int136 derived from bytes
     */
    function popInt136(
        Builder memory self
    ) internal pure returns (int136 element) {
        unchecked {
            self._size -= 136;
            bytes32 mask = MASK_17;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int136(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 17-byte segment from bytes and return as int136
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int136 derived from bytes
     */
    function shiftInt136(
        Builder memory self
    ) internal pure returns (int136 element) {
        unchecked {
            bytes32 mask = MASK_17;
            bytes32 elementBytes = self._data & mask;
            element = int136(Bytes32.toInt256(elementBytes));
            self._data >>= 136;
            self._size -= 136;
        }
    }

    /**
     * @notice insert int136 value to 17-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int136 to add
     */
    function unshiftInt136(Builder memory self, int136 element) internal pure {
        unchecked {
            self._data =
                (self._data << 136) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 120));
            self._size += 136;
        }
    }
    /**
     * @notice insert uint136 value to 17-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint136 to add
     */
    function pushUint136(Builder memory self, uint136 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 136;
        }
    }

    /**
     * @notice remove last 17-byte segment from bytes and return as uint136
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint136 derived from bytes
     */
    function popUint136(
        Builder memory self
    ) internal pure returns (uint136 element) {
        unchecked {
            self._size -= 136;
            bytes32 mask = MASK_17;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint136(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 17-byte segment from bytes and return as uint136
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint136 derived from bytes
     */
    function shiftUint136(
        Builder memory self
    ) internal pure returns (uint136 element) {
        unchecked {
            bytes32 mask = MASK_17;
            bytes32 elementBytes = self._data & mask;
            element = uint136(Bytes32.toUint256(elementBytes));
            self._data >>= 136;
            self._size -= 136;
        }
    }

    /**
     * @notice insert uint136 value to 17-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint136 to add
     */
    function unshiftUint136(
        Builder memory self,
        uint136 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 136) | Uint256.toBytes32(element);
            self._size += 136;
        }
    }
    /**
     * @notice insert bytes18 value to 18-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes18 to add
     */
    function pushBytes18(Builder memory self, bytes18 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 112) << self._size;
            self._size += 144;
        }
    }

    /**
     * @notice remove last 18-byte segment from bytes and return as bytes18
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes18 derived from bytes
     */
    function popBytes18(
        Builder memory self
    ) internal pure returns (bytes18 element) {
        unchecked {
            self._size -= 144;
            bytes32 mask = MASK_18;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes18(elementBytes << 112);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 18-byte segment from bytes and return as bytes18
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes18 derived from bytes
     */
    function shiftBytes18(
        Builder memory self
    ) internal pure returns (bytes18 element) {
        unchecked {
            bytes32 mask = MASK_18;
            bytes32 elementBytes = self._data & mask;
            element = bytes18(elementBytes << 112);
            self._data >>= 144;
            self._size -= 144;
        }
    }

    /**
     * @notice insert bytes18 value to 18-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes18 to add
     */
    function unshiftBytes18(
        Builder memory self,
        bytes18 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 144) | (bytes32(element) >> 112);
            self._size += 144;
        }
    }
    /**
     * @notice insert int144 value to 18-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int144 to add
     */
    function pushInt144(Builder memory self, int144 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 112)) <<
                self._size;
            self._size += 144;
        }
    }

    /**
     * @notice remove last 18-byte segment from bytes and return as int144
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int144 derived from bytes
     */
    function popInt144(
        Builder memory self
    ) internal pure returns (int144 element) {
        unchecked {
            self._size -= 144;
            bytes32 mask = MASK_18;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int144(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 18-byte segment from bytes and return as int144
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int144 derived from bytes
     */
    function shiftInt144(
        Builder memory self
    ) internal pure returns (int144 element) {
        unchecked {
            bytes32 mask = MASK_18;
            bytes32 elementBytes = self._data & mask;
            element = int144(Bytes32.toInt256(elementBytes));
            self._data >>= 144;
            self._size -= 144;
        }
    }

    /**
     * @notice insert int144 value to 18-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int144 to add
     */
    function unshiftInt144(Builder memory self, int144 element) internal pure {
        unchecked {
            self._data =
                (self._data << 144) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 112));
            self._size += 144;
        }
    }
    /**
     * @notice insert uint144 value to 18-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint144 to add
     */
    function pushUint144(Builder memory self, uint144 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 144;
        }
    }

    /**
     * @notice remove last 18-byte segment from bytes and return as uint144
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint144 derived from bytes
     */
    function popUint144(
        Builder memory self
    ) internal pure returns (uint144 element) {
        unchecked {
            self._size -= 144;
            bytes32 mask = MASK_18;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint144(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 18-byte segment from bytes and return as uint144
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint144 derived from bytes
     */
    function shiftUint144(
        Builder memory self
    ) internal pure returns (uint144 element) {
        unchecked {
            bytes32 mask = MASK_18;
            bytes32 elementBytes = self._data & mask;
            element = uint144(Bytes32.toUint256(elementBytes));
            self._data >>= 144;
            self._size -= 144;
        }
    }

    /**
     * @notice insert uint144 value to 18-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint144 to add
     */
    function unshiftUint144(
        Builder memory self,
        uint144 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 144) | Uint256.toBytes32(element);
            self._size += 144;
        }
    }
    /**
     * @notice insert bytes19 value to 19-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes19 to add
     */
    function pushBytes19(Builder memory self, bytes19 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 104) << self._size;
            self._size += 152;
        }
    }

    /**
     * @notice remove last 19-byte segment from bytes and return as bytes19
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes19 derived from bytes
     */
    function popBytes19(
        Builder memory self
    ) internal pure returns (bytes19 element) {
        unchecked {
            self._size -= 152;
            bytes32 mask = MASK_19;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes19(elementBytes << 104);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 19-byte segment from bytes and return as bytes19
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes19 derived from bytes
     */
    function shiftBytes19(
        Builder memory self
    ) internal pure returns (bytes19 element) {
        unchecked {
            bytes32 mask = MASK_19;
            bytes32 elementBytes = self._data & mask;
            element = bytes19(elementBytes << 104);
            self._data >>= 152;
            self._size -= 152;
        }
    }

    /**
     * @notice insert bytes19 value to 19-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes19 to add
     */
    function unshiftBytes19(
        Builder memory self,
        bytes19 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 152) | (bytes32(element) >> 104);
            self._size += 152;
        }
    }
    /**
     * @notice insert int152 value to 19-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int152 to add
     */
    function pushInt152(Builder memory self, int152 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 104)) <<
                self._size;
            self._size += 152;
        }
    }

    /**
     * @notice remove last 19-byte segment from bytes and return as int152
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int152 derived from bytes
     */
    function popInt152(
        Builder memory self
    ) internal pure returns (int152 element) {
        unchecked {
            self._size -= 152;
            bytes32 mask = MASK_19;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int152(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 19-byte segment from bytes and return as int152
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int152 derived from bytes
     */
    function shiftInt152(
        Builder memory self
    ) internal pure returns (int152 element) {
        unchecked {
            bytes32 mask = MASK_19;
            bytes32 elementBytes = self._data & mask;
            element = int152(Bytes32.toInt256(elementBytes));
            self._data >>= 152;
            self._size -= 152;
        }
    }

    /**
     * @notice insert int152 value to 19-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int152 to add
     */
    function unshiftInt152(Builder memory self, int152 element) internal pure {
        unchecked {
            self._data =
                (self._data << 152) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 104));
            self._size += 152;
        }
    }
    /**
     * @notice insert uint152 value to 19-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint152 to add
     */
    function pushUint152(Builder memory self, uint152 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 152;
        }
    }

    /**
     * @notice remove last 19-byte segment from bytes and return as uint152
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint152 derived from bytes
     */
    function popUint152(
        Builder memory self
    ) internal pure returns (uint152 element) {
        unchecked {
            self._size -= 152;
            bytes32 mask = MASK_19;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint152(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 19-byte segment from bytes and return as uint152
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint152 derived from bytes
     */
    function shiftUint152(
        Builder memory self
    ) internal pure returns (uint152 element) {
        unchecked {
            bytes32 mask = MASK_19;
            bytes32 elementBytes = self._data & mask;
            element = uint152(Bytes32.toUint256(elementBytes));
            self._data >>= 152;
            self._size -= 152;
        }
    }

    /**
     * @notice insert uint152 value to 19-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint152 to add
     */
    function unshiftUint152(
        Builder memory self,
        uint152 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 152) | Uint256.toBytes32(element);
            self._size += 152;
        }
    }
    /**
     * @notice insert bytes20 value to 20-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes20 to add
     */
    function pushBytes20(Builder memory self, bytes20 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 96) << self._size;
            self._size += 160;
        }
    }

    /**
     * @notice remove last 20-byte segment from bytes and return as bytes20
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes20 derived from bytes
     */
    function popBytes20(
        Builder memory self
    ) internal pure returns (bytes20 element) {
        unchecked {
            self._size -= 160;
            bytes32 mask = MASK_20;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes20(elementBytes << 96);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 20-byte segment from bytes and return as bytes20
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes20 derived from bytes
     */
    function shiftBytes20(
        Builder memory self
    ) internal pure returns (bytes20 element) {
        unchecked {
            bytes32 mask = MASK_20;
            bytes32 elementBytes = self._data & mask;
            element = bytes20(elementBytes << 96);
            self._data >>= 160;
            self._size -= 160;
        }
    }

    /**
     * @notice insert bytes20 value to 20-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes20 to add
     */
    function unshiftBytes20(
        Builder memory self,
        bytes20 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 160) | (bytes32(element) >> 96);
            self._size += 160;
        }
    }
    /**
     * @notice insert int160 value to 20-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int160 to add
     */
    function pushInt160(Builder memory self, int160 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 96)) <<
                self._size;
            self._size += 160;
        }
    }

    /**
     * @notice remove last 20-byte segment from bytes and return as int160
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int160 derived from bytes
     */
    function popInt160(
        Builder memory self
    ) internal pure returns (int160 element) {
        unchecked {
            self._size -= 160;
            bytes32 mask = MASK_20;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int160(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 20-byte segment from bytes and return as int160
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int160 derived from bytes
     */
    function shiftInt160(
        Builder memory self
    ) internal pure returns (int160 element) {
        unchecked {
            bytes32 mask = MASK_20;
            bytes32 elementBytes = self._data & mask;
            element = int160(Bytes32.toInt256(elementBytes));
            self._data >>= 160;
            self._size -= 160;
        }
    }

    /**
     * @notice insert int160 value to 20-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int160 to add
     */
    function unshiftInt160(Builder memory self, int160 element) internal pure {
        unchecked {
            self._data =
                (self._data << 160) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 96));
            self._size += 160;
        }
    }
    /**
     * @notice insert uint160 value to 20-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint160 to add
     */
    function pushUint160(Builder memory self, uint160 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 160;
        }
    }

    /**
     * @notice remove last 20-byte segment from bytes and return as uint160
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint160 derived from bytes
     */
    function popUint160(
        Builder memory self
    ) internal pure returns (uint160 element) {
        unchecked {
            self._size -= 160;
            bytes32 mask = MASK_20;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint160(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 20-byte segment from bytes and return as uint160
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint160 derived from bytes
     */
    function shiftUint160(
        Builder memory self
    ) internal pure returns (uint160 element) {
        unchecked {
            bytes32 mask = MASK_20;
            bytes32 elementBytes = self._data & mask;
            element = uint160(Bytes32.toUint256(elementBytes));
            self._data >>= 160;
            self._size -= 160;
        }
    }

    /**
     * @notice insert uint160 value to 20-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint160 to add
     */
    function unshiftUint160(
        Builder memory self,
        uint160 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 160) | Uint256.toBytes32(element);
            self._size += 160;
        }
    }
    /**
     * @notice insert address value to 20-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element address to add
     */
    function pushAddress(Builder memory self, address element) internal pure {
        unchecked {
            self._data |= Address.toBytes32(element) << self._size;
            self._size += 160;
        }
    }

    /**
     * @notice remove last 20-byte segment from bytes and return as address
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element address derived from bytes
     */
    function popAddress(
        Builder memory self
    ) internal pure returns (address element) {
        unchecked {
            self._size -= 160;
            bytes32 mask = MASK_20;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = Bytes32.toAddress(elementBytes);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 20-byte segment from bytes and return as address
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element address derived from bytes
     */
    function shiftAddress(
        Builder memory self
    ) internal pure returns (address element) {
        unchecked {
            bytes32 mask = MASK_20;
            bytes32 elementBytes = self._data & mask;
            element = Bytes32.toAddress(elementBytes);
            self._data >>= 160;
            self._size -= 160;
        }
    }

    /**
     * @notice insert address value to 20-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element address to add
     */
    function unshiftAddress(
        Builder memory self,
        address element
    ) internal pure {
        unchecked {
            self._data = (self._data << 160) | Address.toBytes32(element);
            self._size += 160;
        }
    }
    /**
     * @notice insert bytes21 value to 21-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes21 to add
     */
    function pushBytes21(Builder memory self, bytes21 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 88) << self._size;
            self._size += 168;
        }
    }

    /**
     * @notice remove last 21-byte segment from bytes and return as bytes21
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes21 derived from bytes
     */
    function popBytes21(
        Builder memory self
    ) internal pure returns (bytes21 element) {
        unchecked {
            self._size -= 168;
            bytes32 mask = MASK_21;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes21(elementBytes << 88);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 21-byte segment from bytes and return as bytes21
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes21 derived from bytes
     */
    function shiftBytes21(
        Builder memory self
    ) internal pure returns (bytes21 element) {
        unchecked {
            bytes32 mask = MASK_21;
            bytes32 elementBytes = self._data & mask;
            element = bytes21(elementBytes << 88);
            self._data >>= 168;
            self._size -= 168;
        }
    }

    /**
     * @notice insert bytes21 value to 21-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes21 to add
     */
    function unshiftBytes21(
        Builder memory self,
        bytes21 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 168) | (bytes32(element) >> 88);
            self._size += 168;
        }
    }
    /**
     * @notice insert int168 value to 21-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int168 to add
     */
    function pushInt168(Builder memory self, int168 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 88)) <<
                self._size;
            self._size += 168;
        }
    }

    /**
     * @notice remove last 21-byte segment from bytes and return as int168
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int168 derived from bytes
     */
    function popInt168(
        Builder memory self
    ) internal pure returns (int168 element) {
        unchecked {
            self._size -= 168;
            bytes32 mask = MASK_21;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int168(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 21-byte segment from bytes and return as int168
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int168 derived from bytes
     */
    function shiftInt168(
        Builder memory self
    ) internal pure returns (int168 element) {
        unchecked {
            bytes32 mask = MASK_21;
            bytes32 elementBytes = self._data & mask;
            element = int168(Bytes32.toInt256(elementBytes));
            self._data >>= 168;
            self._size -= 168;
        }
    }

    /**
     * @notice insert int168 value to 21-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int168 to add
     */
    function unshiftInt168(Builder memory self, int168 element) internal pure {
        unchecked {
            self._data =
                (self._data << 168) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 88));
            self._size += 168;
        }
    }
    /**
     * @notice insert uint168 value to 21-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint168 to add
     */
    function pushUint168(Builder memory self, uint168 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 168;
        }
    }

    /**
     * @notice remove last 21-byte segment from bytes and return as uint168
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint168 derived from bytes
     */
    function popUint168(
        Builder memory self
    ) internal pure returns (uint168 element) {
        unchecked {
            self._size -= 168;
            bytes32 mask = MASK_21;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint168(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 21-byte segment from bytes and return as uint168
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint168 derived from bytes
     */
    function shiftUint168(
        Builder memory self
    ) internal pure returns (uint168 element) {
        unchecked {
            bytes32 mask = MASK_21;
            bytes32 elementBytes = self._data & mask;
            element = uint168(Bytes32.toUint256(elementBytes));
            self._data >>= 168;
            self._size -= 168;
        }
    }

    /**
     * @notice insert uint168 value to 21-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint168 to add
     */
    function unshiftUint168(
        Builder memory self,
        uint168 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 168) | Uint256.toBytes32(element);
            self._size += 168;
        }
    }
    /**
     * @notice insert bytes22 value to 22-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes22 to add
     */
    function pushBytes22(Builder memory self, bytes22 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 80) << self._size;
            self._size += 176;
        }
    }

    /**
     * @notice remove last 22-byte segment from bytes and return as bytes22
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes22 derived from bytes
     */
    function popBytes22(
        Builder memory self
    ) internal pure returns (bytes22 element) {
        unchecked {
            self._size -= 176;
            bytes32 mask = MASK_22;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes22(elementBytes << 80);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 22-byte segment from bytes and return as bytes22
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes22 derived from bytes
     */
    function shiftBytes22(
        Builder memory self
    ) internal pure returns (bytes22 element) {
        unchecked {
            bytes32 mask = MASK_22;
            bytes32 elementBytes = self._data & mask;
            element = bytes22(elementBytes << 80);
            self._data >>= 176;
            self._size -= 176;
        }
    }

    /**
     * @notice insert bytes22 value to 22-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes22 to add
     */
    function unshiftBytes22(
        Builder memory self,
        bytes22 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 176) | (bytes32(element) >> 80);
            self._size += 176;
        }
    }
    /**
     * @notice insert int176 value to 22-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int176 to add
     */
    function pushInt176(Builder memory self, int176 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 80)) <<
                self._size;
            self._size += 176;
        }
    }

    /**
     * @notice remove last 22-byte segment from bytes and return as int176
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int176 derived from bytes
     */
    function popInt176(
        Builder memory self
    ) internal pure returns (int176 element) {
        unchecked {
            self._size -= 176;
            bytes32 mask = MASK_22;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int176(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 22-byte segment from bytes and return as int176
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int176 derived from bytes
     */
    function shiftInt176(
        Builder memory self
    ) internal pure returns (int176 element) {
        unchecked {
            bytes32 mask = MASK_22;
            bytes32 elementBytes = self._data & mask;
            element = int176(Bytes32.toInt256(elementBytes));
            self._data >>= 176;
            self._size -= 176;
        }
    }

    /**
     * @notice insert int176 value to 22-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int176 to add
     */
    function unshiftInt176(Builder memory self, int176 element) internal pure {
        unchecked {
            self._data =
                (self._data << 176) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 80));
            self._size += 176;
        }
    }
    /**
     * @notice insert uint176 value to 22-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint176 to add
     */
    function pushUint176(Builder memory self, uint176 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 176;
        }
    }

    /**
     * @notice remove last 22-byte segment from bytes and return as uint176
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint176 derived from bytes
     */
    function popUint176(
        Builder memory self
    ) internal pure returns (uint176 element) {
        unchecked {
            self._size -= 176;
            bytes32 mask = MASK_22;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint176(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 22-byte segment from bytes and return as uint176
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint176 derived from bytes
     */
    function shiftUint176(
        Builder memory self
    ) internal pure returns (uint176 element) {
        unchecked {
            bytes32 mask = MASK_22;
            bytes32 elementBytes = self._data & mask;
            element = uint176(Bytes32.toUint256(elementBytes));
            self._data >>= 176;
            self._size -= 176;
        }
    }

    /**
     * @notice insert uint176 value to 22-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint176 to add
     */
    function unshiftUint176(
        Builder memory self,
        uint176 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 176) | Uint256.toBytes32(element);
            self._size += 176;
        }
    }
    /**
     * @notice insert bytes23 value to 23-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes23 to add
     */
    function pushBytes23(Builder memory self, bytes23 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 72) << self._size;
            self._size += 184;
        }
    }

    /**
     * @notice remove last 23-byte segment from bytes and return as bytes23
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes23 derived from bytes
     */
    function popBytes23(
        Builder memory self
    ) internal pure returns (bytes23 element) {
        unchecked {
            self._size -= 184;
            bytes32 mask = MASK_23;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes23(elementBytes << 72);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 23-byte segment from bytes and return as bytes23
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes23 derived from bytes
     */
    function shiftBytes23(
        Builder memory self
    ) internal pure returns (bytes23 element) {
        unchecked {
            bytes32 mask = MASK_23;
            bytes32 elementBytes = self._data & mask;
            element = bytes23(elementBytes << 72);
            self._data >>= 184;
            self._size -= 184;
        }
    }

    /**
     * @notice insert bytes23 value to 23-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes23 to add
     */
    function unshiftBytes23(
        Builder memory self,
        bytes23 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 184) | (bytes32(element) >> 72);
            self._size += 184;
        }
    }
    /**
     * @notice insert int184 value to 23-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int184 to add
     */
    function pushInt184(Builder memory self, int184 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 72)) <<
                self._size;
            self._size += 184;
        }
    }

    /**
     * @notice remove last 23-byte segment from bytes and return as int184
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int184 derived from bytes
     */
    function popInt184(
        Builder memory self
    ) internal pure returns (int184 element) {
        unchecked {
            self._size -= 184;
            bytes32 mask = MASK_23;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int184(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 23-byte segment from bytes and return as int184
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int184 derived from bytes
     */
    function shiftInt184(
        Builder memory self
    ) internal pure returns (int184 element) {
        unchecked {
            bytes32 mask = MASK_23;
            bytes32 elementBytes = self._data & mask;
            element = int184(Bytes32.toInt256(elementBytes));
            self._data >>= 184;
            self._size -= 184;
        }
    }

    /**
     * @notice insert int184 value to 23-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int184 to add
     */
    function unshiftInt184(Builder memory self, int184 element) internal pure {
        unchecked {
            self._data =
                (self._data << 184) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 72));
            self._size += 184;
        }
    }
    /**
     * @notice insert uint184 value to 23-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint184 to add
     */
    function pushUint184(Builder memory self, uint184 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 184;
        }
    }

    /**
     * @notice remove last 23-byte segment from bytes and return as uint184
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint184 derived from bytes
     */
    function popUint184(
        Builder memory self
    ) internal pure returns (uint184 element) {
        unchecked {
            self._size -= 184;
            bytes32 mask = MASK_23;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint184(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 23-byte segment from bytes and return as uint184
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint184 derived from bytes
     */
    function shiftUint184(
        Builder memory self
    ) internal pure returns (uint184 element) {
        unchecked {
            bytes32 mask = MASK_23;
            bytes32 elementBytes = self._data & mask;
            element = uint184(Bytes32.toUint256(elementBytes));
            self._data >>= 184;
            self._size -= 184;
        }
    }

    /**
     * @notice insert uint184 value to 23-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint184 to add
     */
    function unshiftUint184(
        Builder memory self,
        uint184 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 184) | Uint256.toBytes32(element);
            self._size += 184;
        }
    }
    /**
     * @notice insert bytes24 value to 24-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes24 to add
     */
    function pushBytes24(Builder memory self, bytes24 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 64) << self._size;
            self._size += 192;
        }
    }

    /**
     * @notice remove last 24-byte segment from bytes and return as bytes24
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes24 derived from bytes
     */
    function popBytes24(
        Builder memory self
    ) internal pure returns (bytes24 element) {
        unchecked {
            self._size -= 192;
            bytes32 mask = MASK_24;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes24(elementBytes << 64);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 24-byte segment from bytes and return as bytes24
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes24 derived from bytes
     */
    function shiftBytes24(
        Builder memory self
    ) internal pure returns (bytes24 element) {
        unchecked {
            bytes32 mask = MASK_24;
            bytes32 elementBytes = self._data & mask;
            element = bytes24(elementBytes << 64);
            self._data >>= 192;
            self._size -= 192;
        }
    }

    /**
     * @notice insert bytes24 value to 24-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes24 to add
     */
    function unshiftBytes24(
        Builder memory self,
        bytes24 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 192) | (bytes32(element) >> 64);
            self._size += 192;
        }
    }
    /**
     * @notice insert int192 value to 24-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int192 to add
     */
    function pushInt192(Builder memory self, int192 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 64)) <<
                self._size;
            self._size += 192;
        }
    }

    /**
     * @notice remove last 24-byte segment from bytes and return as int192
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int192 derived from bytes
     */
    function popInt192(
        Builder memory self
    ) internal pure returns (int192 element) {
        unchecked {
            self._size -= 192;
            bytes32 mask = MASK_24;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int192(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 24-byte segment from bytes and return as int192
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int192 derived from bytes
     */
    function shiftInt192(
        Builder memory self
    ) internal pure returns (int192 element) {
        unchecked {
            bytes32 mask = MASK_24;
            bytes32 elementBytes = self._data & mask;
            element = int192(Bytes32.toInt256(elementBytes));
            self._data >>= 192;
            self._size -= 192;
        }
    }

    /**
     * @notice insert int192 value to 24-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int192 to add
     */
    function unshiftInt192(Builder memory self, int192 element) internal pure {
        unchecked {
            self._data =
                (self._data << 192) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 64));
            self._size += 192;
        }
    }
    /**
     * @notice insert uint192 value to 24-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint192 to add
     */
    function pushUint192(Builder memory self, uint192 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 192;
        }
    }

    /**
     * @notice remove last 24-byte segment from bytes and return as uint192
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint192 derived from bytes
     */
    function popUint192(
        Builder memory self
    ) internal pure returns (uint192 element) {
        unchecked {
            self._size -= 192;
            bytes32 mask = MASK_24;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint192(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 24-byte segment from bytes and return as uint192
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint192 derived from bytes
     */
    function shiftUint192(
        Builder memory self
    ) internal pure returns (uint192 element) {
        unchecked {
            bytes32 mask = MASK_24;
            bytes32 elementBytes = self._data & mask;
            element = uint192(Bytes32.toUint256(elementBytes));
            self._data >>= 192;
            self._size -= 192;
        }
    }

    /**
     * @notice insert uint192 value to 24-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint192 to add
     */
    function unshiftUint192(
        Builder memory self,
        uint192 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 192) | Uint256.toBytes32(element);
            self._size += 192;
        }
    }
    /**
     * @notice insert bytes25 value to 25-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes25 to add
     */
    function pushBytes25(Builder memory self, bytes25 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 56) << self._size;
            self._size += 200;
        }
    }

    /**
     * @notice remove last 25-byte segment from bytes and return as bytes25
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes25 derived from bytes
     */
    function popBytes25(
        Builder memory self
    ) internal pure returns (bytes25 element) {
        unchecked {
            self._size -= 200;
            bytes32 mask = MASK_25;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes25(elementBytes << 56);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 25-byte segment from bytes and return as bytes25
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes25 derived from bytes
     */
    function shiftBytes25(
        Builder memory self
    ) internal pure returns (bytes25 element) {
        unchecked {
            bytes32 mask = MASK_25;
            bytes32 elementBytes = self._data & mask;
            element = bytes25(elementBytes << 56);
            self._data >>= 200;
            self._size -= 200;
        }
    }

    /**
     * @notice insert bytes25 value to 25-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes25 to add
     */
    function unshiftBytes25(
        Builder memory self,
        bytes25 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 200) | (bytes32(element) >> 56);
            self._size += 200;
        }
    }
    /**
     * @notice insert int200 value to 25-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int200 to add
     */
    function pushInt200(Builder memory self, int200 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 56)) <<
                self._size;
            self._size += 200;
        }
    }

    /**
     * @notice remove last 25-byte segment from bytes and return as int200
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int200 derived from bytes
     */
    function popInt200(
        Builder memory self
    ) internal pure returns (int200 element) {
        unchecked {
            self._size -= 200;
            bytes32 mask = MASK_25;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int200(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 25-byte segment from bytes and return as int200
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int200 derived from bytes
     */
    function shiftInt200(
        Builder memory self
    ) internal pure returns (int200 element) {
        unchecked {
            bytes32 mask = MASK_25;
            bytes32 elementBytes = self._data & mask;
            element = int200(Bytes32.toInt256(elementBytes));
            self._data >>= 200;
            self._size -= 200;
        }
    }

    /**
     * @notice insert int200 value to 25-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int200 to add
     */
    function unshiftInt200(Builder memory self, int200 element) internal pure {
        unchecked {
            self._data =
                (self._data << 200) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 56));
            self._size += 200;
        }
    }
    /**
     * @notice insert uint200 value to 25-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint200 to add
     */
    function pushUint200(Builder memory self, uint200 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 200;
        }
    }

    /**
     * @notice remove last 25-byte segment from bytes and return as uint200
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint200 derived from bytes
     */
    function popUint200(
        Builder memory self
    ) internal pure returns (uint200 element) {
        unchecked {
            self._size -= 200;
            bytes32 mask = MASK_25;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint200(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 25-byte segment from bytes and return as uint200
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint200 derived from bytes
     */
    function shiftUint200(
        Builder memory self
    ) internal pure returns (uint200 element) {
        unchecked {
            bytes32 mask = MASK_25;
            bytes32 elementBytes = self._data & mask;
            element = uint200(Bytes32.toUint256(elementBytes));
            self._data >>= 200;
            self._size -= 200;
        }
    }

    /**
     * @notice insert uint200 value to 25-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint200 to add
     */
    function unshiftUint200(
        Builder memory self,
        uint200 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 200) | Uint256.toBytes32(element);
            self._size += 200;
        }
    }
    /**
     * @notice insert bytes26 value to 26-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes26 to add
     */
    function pushBytes26(Builder memory self, bytes26 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 48) << self._size;
            self._size += 208;
        }
    }

    /**
     * @notice remove last 26-byte segment from bytes and return as bytes26
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes26 derived from bytes
     */
    function popBytes26(
        Builder memory self
    ) internal pure returns (bytes26 element) {
        unchecked {
            self._size -= 208;
            bytes32 mask = MASK_26;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes26(elementBytes << 48);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 26-byte segment from bytes and return as bytes26
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes26 derived from bytes
     */
    function shiftBytes26(
        Builder memory self
    ) internal pure returns (bytes26 element) {
        unchecked {
            bytes32 mask = MASK_26;
            bytes32 elementBytes = self._data & mask;
            element = bytes26(elementBytes << 48);
            self._data >>= 208;
            self._size -= 208;
        }
    }

    /**
     * @notice insert bytes26 value to 26-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes26 to add
     */
    function unshiftBytes26(
        Builder memory self,
        bytes26 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 208) | (bytes32(element) >> 48);
            self._size += 208;
        }
    }
    /**
     * @notice insert int208 value to 26-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int208 to add
     */
    function pushInt208(Builder memory self, int208 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 48)) <<
                self._size;
            self._size += 208;
        }
    }

    /**
     * @notice remove last 26-byte segment from bytes and return as int208
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int208 derived from bytes
     */
    function popInt208(
        Builder memory self
    ) internal pure returns (int208 element) {
        unchecked {
            self._size -= 208;
            bytes32 mask = MASK_26;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int208(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 26-byte segment from bytes and return as int208
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int208 derived from bytes
     */
    function shiftInt208(
        Builder memory self
    ) internal pure returns (int208 element) {
        unchecked {
            bytes32 mask = MASK_26;
            bytes32 elementBytes = self._data & mask;
            element = int208(Bytes32.toInt256(elementBytes));
            self._data >>= 208;
            self._size -= 208;
        }
    }

    /**
     * @notice insert int208 value to 26-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int208 to add
     */
    function unshiftInt208(Builder memory self, int208 element) internal pure {
        unchecked {
            self._data =
                (self._data << 208) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 48));
            self._size += 208;
        }
    }
    /**
     * @notice insert uint208 value to 26-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint208 to add
     */
    function pushUint208(Builder memory self, uint208 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 208;
        }
    }

    /**
     * @notice remove last 26-byte segment from bytes and return as uint208
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint208 derived from bytes
     */
    function popUint208(
        Builder memory self
    ) internal pure returns (uint208 element) {
        unchecked {
            self._size -= 208;
            bytes32 mask = MASK_26;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint208(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 26-byte segment from bytes and return as uint208
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint208 derived from bytes
     */
    function shiftUint208(
        Builder memory self
    ) internal pure returns (uint208 element) {
        unchecked {
            bytes32 mask = MASK_26;
            bytes32 elementBytes = self._data & mask;
            element = uint208(Bytes32.toUint256(elementBytes));
            self._data >>= 208;
            self._size -= 208;
        }
    }

    /**
     * @notice insert uint208 value to 26-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint208 to add
     */
    function unshiftUint208(
        Builder memory self,
        uint208 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 208) | Uint256.toBytes32(element);
            self._size += 208;
        }
    }
    /**
     * @notice insert bytes27 value to 27-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes27 to add
     */
    function pushBytes27(Builder memory self, bytes27 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 40) << self._size;
            self._size += 216;
        }
    }

    /**
     * @notice remove last 27-byte segment from bytes and return as bytes27
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes27 derived from bytes
     */
    function popBytes27(
        Builder memory self
    ) internal pure returns (bytes27 element) {
        unchecked {
            self._size -= 216;
            bytes32 mask = MASK_27;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes27(elementBytes << 40);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 27-byte segment from bytes and return as bytes27
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes27 derived from bytes
     */
    function shiftBytes27(
        Builder memory self
    ) internal pure returns (bytes27 element) {
        unchecked {
            bytes32 mask = MASK_27;
            bytes32 elementBytes = self._data & mask;
            element = bytes27(elementBytes << 40);
            self._data >>= 216;
            self._size -= 216;
        }
    }

    /**
     * @notice insert bytes27 value to 27-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes27 to add
     */
    function unshiftBytes27(
        Builder memory self,
        bytes27 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 216) | (bytes32(element) >> 40);
            self._size += 216;
        }
    }
    /**
     * @notice insert int216 value to 27-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int216 to add
     */
    function pushInt216(Builder memory self, int216 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 40)) <<
                self._size;
            self._size += 216;
        }
    }

    /**
     * @notice remove last 27-byte segment from bytes and return as int216
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int216 derived from bytes
     */
    function popInt216(
        Builder memory self
    ) internal pure returns (int216 element) {
        unchecked {
            self._size -= 216;
            bytes32 mask = MASK_27;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int216(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 27-byte segment from bytes and return as int216
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int216 derived from bytes
     */
    function shiftInt216(
        Builder memory self
    ) internal pure returns (int216 element) {
        unchecked {
            bytes32 mask = MASK_27;
            bytes32 elementBytes = self._data & mask;
            element = int216(Bytes32.toInt256(elementBytes));
            self._data >>= 216;
            self._size -= 216;
        }
    }

    /**
     * @notice insert int216 value to 27-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int216 to add
     */
    function unshiftInt216(Builder memory self, int216 element) internal pure {
        unchecked {
            self._data =
                (self._data << 216) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 40));
            self._size += 216;
        }
    }
    /**
     * @notice insert uint216 value to 27-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint216 to add
     */
    function pushUint216(Builder memory self, uint216 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 216;
        }
    }

    /**
     * @notice remove last 27-byte segment from bytes and return as uint216
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint216 derived from bytes
     */
    function popUint216(
        Builder memory self
    ) internal pure returns (uint216 element) {
        unchecked {
            self._size -= 216;
            bytes32 mask = MASK_27;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint216(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 27-byte segment from bytes and return as uint216
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint216 derived from bytes
     */
    function shiftUint216(
        Builder memory self
    ) internal pure returns (uint216 element) {
        unchecked {
            bytes32 mask = MASK_27;
            bytes32 elementBytes = self._data & mask;
            element = uint216(Bytes32.toUint256(elementBytes));
            self._data >>= 216;
            self._size -= 216;
        }
    }

    /**
     * @notice insert uint216 value to 27-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint216 to add
     */
    function unshiftUint216(
        Builder memory self,
        uint216 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 216) | Uint256.toBytes32(element);
            self._size += 216;
        }
    }
    /**
     * @notice insert bytes28 value to 28-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes28 to add
     */
    function pushBytes28(Builder memory self, bytes28 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 32) << self._size;
            self._size += 224;
        }
    }

    /**
     * @notice remove last 28-byte segment from bytes and return as bytes28
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes28 derived from bytes
     */
    function popBytes28(
        Builder memory self
    ) internal pure returns (bytes28 element) {
        unchecked {
            self._size -= 224;
            bytes32 mask = MASK_28;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes28(elementBytes << 32);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 28-byte segment from bytes and return as bytes28
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes28 derived from bytes
     */
    function shiftBytes28(
        Builder memory self
    ) internal pure returns (bytes28 element) {
        unchecked {
            bytes32 mask = MASK_28;
            bytes32 elementBytes = self._data & mask;
            element = bytes28(elementBytes << 32);
            self._data >>= 224;
            self._size -= 224;
        }
    }

    /**
     * @notice insert bytes28 value to 28-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes28 to add
     */
    function unshiftBytes28(
        Builder memory self,
        bytes28 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 224) | (bytes32(element) >> 32);
            self._size += 224;
        }
    }
    /**
     * @notice insert int224 value to 28-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int224 to add
     */
    function pushInt224(Builder memory self, int224 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 32)) <<
                self._size;
            self._size += 224;
        }
    }

    /**
     * @notice remove last 28-byte segment from bytes and return as int224
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int224 derived from bytes
     */
    function popInt224(
        Builder memory self
    ) internal pure returns (int224 element) {
        unchecked {
            self._size -= 224;
            bytes32 mask = MASK_28;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int224(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 28-byte segment from bytes and return as int224
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int224 derived from bytes
     */
    function shiftInt224(
        Builder memory self
    ) internal pure returns (int224 element) {
        unchecked {
            bytes32 mask = MASK_28;
            bytes32 elementBytes = self._data & mask;
            element = int224(Bytes32.toInt256(elementBytes));
            self._data >>= 224;
            self._size -= 224;
        }
    }

    /**
     * @notice insert int224 value to 28-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int224 to add
     */
    function unshiftInt224(Builder memory self, int224 element) internal pure {
        unchecked {
            self._data =
                (self._data << 224) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 32));
            self._size += 224;
        }
    }
    /**
     * @notice insert uint224 value to 28-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint224 to add
     */
    function pushUint224(Builder memory self, uint224 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 224;
        }
    }

    /**
     * @notice remove last 28-byte segment from bytes and return as uint224
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint224 derived from bytes
     */
    function popUint224(
        Builder memory self
    ) internal pure returns (uint224 element) {
        unchecked {
            self._size -= 224;
            bytes32 mask = MASK_28;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint224(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 28-byte segment from bytes and return as uint224
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint224 derived from bytes
     */
    function shiftUint224(
        Builder memory self
    ) internal pure returns (uint224 element) {
        unchecked {
            bytes32 mask = MASK_28;
            bytes32 elementBytes = self._data & mask;
            element = uint224(Bytes32.toUint256(elementBytes));
            self._data >>= 224;
            self._size -= 224;
        }
    }

    /**
     * @notice insert uint224 value to 28-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint224 to add
     */
    function unshiftUint224(
        Builder memory self,
        uint224 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 224) | Uint256.toBytes32(element);
            self._size += 224;
        }
    }
    /**
     * @notice insert bytes29 value to 29-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes29 to add
     */
    function pushBytes29(Builder memory self, bytes29 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 24) << self._size;
            self._size += 232;
        }
    }

    /**
     * @notice remove last 29-byte segment from bytes and return as bytes29
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes29 derived from bytes
     */
    function popBytes29(
        Builder memory self
    ) internal pure returns (bytes29 element) {
        unchecked {
            self._size -= 232;
            bytes32 mask = MASK_29;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes29(elementBytes << 24);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 29-byte segment from bytes and return as bytes29
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes29 derived from bytes
     */
    function shiftBytes29(
        Builder memory self
    ) internal pure returns (bytes29 element) {
        unchecked {
            bytes32 mask = MASK_29;
            bytes32 elementBytes = self._data & mask;
            element = bytes29(elementBytes << 24);
            self._data >>= 232;
            self._size -= 232;
        }
    }

    /**
     * @notice insert bytes29 value to 29-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes29 to add
     */
    function unshiftBytes29(
        Builder memory self,
        bytes29 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 232) | (bytes32(element) >> 24);
            self._size += 232;
        }
    }
    /**
     * @notice insert int232 value to 29-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int232 to add
     */
    function pushInt232(Builder memory self, int232 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 24)) <<
                self._size;
            self._size += 232;
        }
    }

    /**
     * @notice remove last 29-byte segment from bytes and return as int232
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int232 derived from bytes
     */
    function popInt232(
        Builder memory self
    ) internal pure returns (int232 element) {
        unchecked {
            self._size -= 232;
            bytes32 mask = MASK_29;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int232(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 29-byte segment from bytes and return as int232
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int232 derived from bytes
     */
    function shiftInt232(
        Builder memory self
    ) internal pure returns (int232 element) {
        unchecked {
            bytes32 mask = MASK_29;
            bytes32 elementBytes = self._data & mask;
            element = int232(Bytes32.toInt256(elementBytes));
            self._data >>= 232;
            self._size -= 232;
        }
    }

    /**
     * @notice insert int232 value to 29-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int232 to add
     */
    function unshiftInt232(Builder memory self, int232 element) internal pure {
        unchecked {
            self._data =
                (self._data << 232) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 24));
            self._size += 232;
        }
    }
    /**
     * @notice insert uint232 value to 29-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint232 to add
     */
    function pushUint232(Builder memory self, uint232 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 232;
        }
    }

    /**
     * @notice remove last 29-byte segment from bytes and return as uint232
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint232 derived from bytes
     */
    function popUint232(
        Builder memory self
    ) internal pure returns (uint232 element) {
        unchecked {
            self._size -= 232;
            bytes32 mask = MASK_29;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint232(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 29-byte segment from bytes and return as uint232
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint232 derived from bytes
     */
    function shiftUint232(
        Builder memory self
    ) internal pure returns (uint232 element) {
        unchecked {
            bytes32 mask = MASK_29;
            bytes32 elementBytes = self._data & mask;
            element = uint232(Bytes32.toUint256(elementBytes));
            self._data >>= 232;
            self._size -= 232;
        }
    }

    /**
     * @notice insert uint232 value to 29-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint232 to add
     */
    function unshiftUint232(
        Builder memory self,
        uint232 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 232) | Uint256.toBytes32(element);
            self._size += 232;
        }
    }
    /**
     * @notice insert bytes30 value to 30-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes30 to add
     */
    function pushBytes30(Builder memory self, bytes30 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 16) << self._size;
            self._size += 240;
        }
    }

    /**
     * @notice remove last 30-byte segment from bytes and return as bytes30
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes30 derived from bytes
     */
    function popBytes30(
        Builder memory self
    ) internal pure returns (bytes30 element) {
        unchecked {
            self._size -= 240;
            bytes32 mask = MASK_30;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes30(elementBytes << 16);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 30-byte segment from bytes and return as bytes30
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes30 derived from bytes
     */
    function shiftBytes30(
        Builder memory self
    ) internal pure returns (bytes30 element) {
        unchecked {
            bytes32 mask = MASK_30;
            bytes32 elementBytes = self._data & mask;
            element = bytes30(elementBytes << 16);
            self._data >>= 240;
            self._size -= 240;
        }
    }

    /**
     * @notice insert bytes30 value to 30-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes30 to add
     */
    function unshiftBytes30(
        Builder memory self,
        bytes30 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 240) | (bytes32(element) >> 16);
            self._size += 240;
        }
    }
    /**
     * @notice insert int240 value to 30-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int240 to add
     */
    function pushInt240(Builder memory self, int240 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 16)) <<
                self._size;
            self._size += 240;
        }
    }

    /**
     * @notice remove last 30-byte segment from bytes and return as int240
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int240 derived from bytes
     */
    function popInt240(
        Builder memory self
    ) internal pure returns (int240 element) {
        unchecked {
            self._size -= 240;
            bytes32 mask = MASK_30;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int240(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 30-byte segment from bytes and return as int240
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int240 derived from bytes
     */
    function shiftInt240(
        Builder memory self
    ) internal pure returns (int240 element) {
        unchecked {
            bytes32 mask = MASK_30;
            bytes32 elementBytes = self._data & mask;
            element = int240(Bytes32.toInt256(elementBytes));
            self._data >>= 240;
            self._size -= 240;
        }
    }

    /**
     * @notice insert int240 value to 30-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int240 to add
     */
    function unshiftInt240(Builder memory self, int240 element) internal pure {
        unchecked {
            self._data =
                (self._data << 240) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 16));
            self._size += 240;
        }
    }
    /**
     * @notice insert uint240 value to 30-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint240 to add
     */
    function pushUint240(Builder memory self, uint240 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 240;
        }
    }

    /**
     * @notice remove last 30-byte segment from bytes and return as uint240
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint240 derived from bytes
     */
    function popUint240(
        Builder memory self
    ) internal pure returns (uint240 element) {
        unchecked {
            self._size -= 240;
            bytes32 mask = MASK_30;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint240(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 30-byte segment from bytes and return as uint240
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint240 derived from bytes
     */
    function shiftUint240(
        Builder memory self
    ) internal pure returns (uint240 element) {
        unchecked {
            bytes32 mask = MASK_30;
            bytes32 elementBytes = self._data & mask;
            element = uint240(Bytes32.toUint256(elementBytes));
            self._data >>= 240;
            self._size -= 240;
        }
    }

    /**
     * @notice insert uint240 value to 30-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint240 to add
     */
    function unshiftUint240(
        Builder memory self,
        uint240 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 240) | Uint256.toBytes32(element);
            self._size += 240;
        }
    }
    /**
     * @notice insert bytes31 value to 31-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes31 to add
     */
    function pushBytes31(Builder memory self, bytes31 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 8) << self._size;
            self._size += 248;
        }
    }

    /**
     * @notice remove last 31-byte segment from bytes and return as bytes31
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes31 derived from bytes
     */
    function popBytes31(
        Builder memory self
    ) internal pure returns (bytes31 element) {
        unchecked {
            self._size -= 248;
            bytes32 mask = MASK_31;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes31(elementBytes << 8);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 31-byte segment from bytes and return as bytes31
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes31 derived from bytes
     */
    function shiftBytes31(
        Builder memory self
    ) internal pure returns (bytes31 element) {
        unchecked {
            bytes32 mask = MASK_31;
            bytes32 elementBytes = self._data & mask;
            element = bytes31(elementBytes << 8);
            self._data >>= 248;
            self._size -= 248;
        }
    }

    /**
     * @notice insert bytes31 value to 31-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes31 to add
     */
    function unshiftBytes31(
        Builder memory self,
        bytes31 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 248) | (bytes32(element) >> 8);
            self._size += 248;
        }
    }
    /**
     * @notice insert int248 value to 31-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int248 to add
     */
    function pushInt248(Builder memory self, int248 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 8)) <<
                self._size;
            self._size += 248;
        }
    }

    /**
     * @notice remove last 31-byte segment from bytes and return as int248
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int248 derived from bytes
     */
    function popInt248(
        Builder memory self
    ) internal pure returns (int248 element) {
        unchecked {
            self._size -= 248;
            bytes32 mask = MASK_31;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int248(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 31-byte segment from bytes and return as int248
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int248 derived from bytes
     */
    function shiftInt248(
        Builder memory self
    ) internal pure returns (int248 element) {
        unchecked {
            bytes32 mask = MASK_31;
            bytes32 elementBytes = self._data & mask;
            element = int248(Bytes32.toInt256(elementBytes));
            self._data >>= 248;
            self._size -= 248;
        }
    }

    /**
     * @notice insert int248 value to 31-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int248 to add
     */
    function unshiftInt248(Builder memory self, int248 element) internal pure {
        unchecked {
            self._data =
                (self._data << 248) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 8));
            self._size += 248;
        }
    }
    /**
     * @notice insert uint248 value to 31-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint248 to add
     */
    function pushUint248(Builder memory self, uint248 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 248;
        }
    }

    /**
     * @notice remove last 31-byte segment from bytes and return as uint248
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint248 derived from bytes
     */
    function popUint248(
        Builder memory self
    ) internal pure returns (uint248 element) {
        unchecked {
            self._size -= 248;
            bytes32 mask = MASK_31;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint248(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 31-byte segment from bytes and return as uint248
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint248 derived from bytes
     */
    function shiftUint248(
        Builder memory self
    ) internal pure returns (uint248 element) {
        unchecked {
            bytes32 mask = MASK_31;
            bytes32 elementBytes = self._data & mask;
            element = uint248(Bytes32.toUint256(elementBytes));
            self._data >>= 248;
            self._size -= 248;
        }
    }

    /**
     * @notice insert uint248 value to 31-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint248 to add
     */
    function unshiftUint248(
        Builder memory self,
        uint248 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 248) | Uint256.toBytes32(element);
            self._size += 248;
        }
    }
    /**
     * @notice insert bytes32 value to 32-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes32 to add
     */
    function pushBytes32(Builder memory self, bytes32 element) internal pure {
        unchecked {
            self._data |= (bytes32(element) >> 0) << self._size;
            self._size += 256;
        }
    }

    /**
     * @notice remove last 32-byte segment from bytes and return as bytes32
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes32 derived from bytes
     */
    function popBytes32(
        Builder memory self
    ) internal pure returns (bytes32 element) {
        unchecked {
            self._size -= 256;
            bytes32 mask = MASK_32;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = bytes32(elementBytes << 0);
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 32-byte segment from bytes and return as bytes32
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element bytes32 derived from bytes
     */
    function shiftBytes32(
        Builder memory self
    ) internal pure returns (bytes32 element) {
        unchecked {
            bytes32 mask = MASK_32;
            bytes32 elementBytes = self._data & mask;
            element = bytes32(elementBytes << 0);
            self._data >>= 256;
            self._size -= 256;
        }
    }

    /**
     * @notice insert bytes32 value to 32-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element bytes32 to add
     */
    function unshiftBytes32(
        Builder memory self,
        bytes32 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 256) | (bytes32(element) >> 0);
            self._size += 256;
        }
    }
    /**
     * @notice insert int256 value to 32-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int256 to add
     */
    function pushInt256(Builder memory self, int256 element) internal pure {
        unchecked {
            self._data |=
                (Int256.toBytes32(element) & (~bytes32(0) >> 0)) <<
                self._size;
            self._size += 256;
        }
    }

    /**
     * @notice remove last 32-byte segment from bytes and return as int256
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int256 derived from bytes
     */
    function popInt256(
        Builder memory self
    ) internal pure returns (int256 element) {
        unchecked {
            self._size -= 256;
            bytes32 mask = MASK_32;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = int256(Bytes32.toInt256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 32-byte segment from bytes and return as int256
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element int256 derived from bytes
     */
    function shiftInt256(
        Builder memory self
    ) internal pure returns (int256 element) {
        unchecked {
            bytes32 mask = MASK_32;
            bytes32 elementBytes = self._data & mask;
            element = int256(Bytes32.toInt256(elementBytes));
            self._data >>= 256;
            self._size -= 256;
        }
    }

    /**
     * @notice insert int256 value to 32-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element int256 to add
     */
    function unshiftInt256(Builder memory self, int256 element) internal pure {
        unchecked {
            self._data =
                (self._data << 256) |
                (Int256.toBytes32(element) & (~bytes32(0) >> 0));
            self._size += 256;
        }
    }
    /**
     * @notice insert uint256 value to 32-byte position at end of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint256 to add
     */
    function pushUint256(Builder memory self, uint256 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 256;
        }
    }

    /**
     * @notice remove last 32-byte segment from bytes and return as uint256
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint256 derived from bytes
     */
    function popUint256(
        Builder memory self
    ) internal pure returns (uint256 element) {
        unchecked {
            self._size -= 256;
            bytes32 mask = MASK_32;
            bytes32 elementBytes = (self._data >> self._size) & mask;
            element = uint256(Bytes32.toUint256(elementBytes));
            self._data &= ~(mask << self._size);
        }
    }

    /**
     * @notice remove first 32-byte segment from bytes and return as uint256
     * @param self Bytes32Builder Builder struct on which to operate
     * @return element uint256 derived from bytes
     */
    function shiftUint256(
        Builder memory self
    ) internal pure returns (uint256 element) {
        unchecked {
            bytes32 mask = MASK_32;
            bytes32 elementBytes = self._data & mask;
            element = uint256(Bytes32.toUint256(elementBytes));
            self._data >>= 256;
            self._size -= 256;
        }
    }

    /**
     * @notice insert uint256 value to 32-byte position at beginning of bytes
     * @param self Bytes32Builder Builder struct on which to operate
     * @param element uint256 to add
     */
    function unshiftUint256(
        Builder memory self,
        uint256 element
    ) internal pure {
        unchecked {
            self._data = (self._data << 256) | Uint256.toBytes32(element);
            self._size += 256;
        }
    }
}
