
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
    bytes32 private constant MASK_01 = 0x00000000000000000000000000000000000000000000000000000000000000ff;
    bytes32 private constant MASK_02 = 0x000000000000000000000000000000000000000000000000000000000000ffff;
    bytes32 private constant MASK_03 = 0x0000000000000000000000000000000000000000000000000000000000ffffff;
    bytes32 private constant MASK_04 = 0x00000000000000000000000000000000000000000000000000000000ffffffff;
    bytes32 private constant MASK_05 = 0x000000000000000000000000000000000000000000000000000000ffffffffff;
    bytes32 private constant MASK_06 = 0x0000000000000000000000000000000000000000000000000000ffffffffffff;
    bytes32 private constant MASK_07 = 0x00000000000000000000000000000000000000000000000000ffffffffffffff;
    bytes32 private constant MASK_08 = 0x000000000000000000000000000000000000000000000000ffffffffffffffff;
    bytes32 private constant MASK_09 = 0x0000000000000000000000000000000000000000000000ffffffffffffffffff;
    bytes32 private constant MASK_10 = 0x00000000000000000000000000000000000000000000ffffffffffffffffffff;
    bytes32 private constant MASK_11 = 0x000000000000000000000000000000000000000000ffffffffffffffffffffff;
    bytes32 private constant MASK_12 = 0x0000000000000000000000000000000000000000ffffffffffffffffffffffff;
    bytes32 private constant MASK_13 = 0x00000000000000000000000000000000000000ffffffffffffffffffffffffff;
    bytes32 private constant MASK_14 = 0x000000000000000000000000000000000000ffffffffffffffffffffffffffff;
    bytes32 private constant MASK_15 = 0x0000000000000000000000000000000000ffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_16 = 0x00000000000000000000000000000000ffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_17 = 0x000000000000000000000000000000ffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_18 = 0x0000000000000000000000000000ffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_19 = 0x00000000000000000000000000ffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_20 = 0x000000000000000000000000ffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_21 = 0x0000000000000000000000ffffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_22 = 0x00000000000000000000ffffffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_23 = 0x000000000000000000ffffffffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_24 = 0x0000000000000000ffffffffffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_25 = 0x00000000000000ffffffffffffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_26 = 0x000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_27 = 0x0000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_28 = 0x00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_29 = 0x000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_30 = 0x0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_31 = 0x00ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
    bytes32 private constant MASK_32 = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;

    /**
     * @notice parse bytes1 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes1 derived from bytes
     */
    function parseBytes1(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes1 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_01;
        element = bytes1(elementBytes << 248);
    }

    /**
     * @notice insert bytes1 value to 1-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes1 to insert
     * @param offset slot offset in bits
     */
    function insertBytes1(Bytes32.Builder memory self, bytes1 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_01 << offset) | (bytes32(element) >> 248 << offset);
            if (self._size < 8 + offset) self._size = 8 + offset;
        }
    }

    /**
     * @notice insert bytes1 value to 1-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes1 to add
     */
    function pushBytes1(Bytes32.Builder memory self, bytes1 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 248 << self._size;
            self._size += 8;
        }
    }

    /**
     * @notice remove last 1-byte segment from bytes and return as bytes1
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes1 derived from bytes
     */
    function popBytes1(Bytes32.Builder memory self) internal pure returns (bytes1 element) {
        unchecked {
            self._size -= 8;
            bytes32 elementBytes = (self._data >> self._size) & MASK_01;
            element = bytes1(elementBytes << 248);
            self._data &= ~(MASK_01 << self._size);
        }
    }

    /**
     * @notice remove first 1-byte segment from bytes and return as bytes1
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes1 derived from bytes
     */
    function shiftBytes1(Bytes32.Builder memory self) internal pure returns (bytes1 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_01;
            element = bytes1(elementBytes << 248);
            self._data >>= 8;
            self._size -= 8;
        }
    }

    /**
     * @notice insert bytes1 value to 1-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes1 to add
     */
    function unshiftBytes1(Bytes32.Builder memory self, bytes1 element) internal pure {
        unchecked {
            self._data = (self._data << 8) | bytes32(element) >> 248;
            self._size += 8;
        }
    }
    /**
     * @notice parse int8 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int8 derived from bytes
     */
    function parseInt8(Bytes32.Builder memory self, uint256 offset) internal pure returns (int8 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_01;
        element = int8(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int8 value to 1-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int8 to insert
     * @param offset slot offset in bits
     */
    function insertInt8(Bytes32.Builder memory self, int8 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_01 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 248)) << offset);
            if (self._size < 8 + offset) self._size = 8 + offset;
        }
    }

    /**
     * @notice insert int8 value to 1-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int8 to add
     */
    function pushInt8(Bytes32.Builder memory self, int8 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 248)) << self._size;
            self._size += 8;
        }
    }

    /**
     * @notice remove last 1-byte segment from bytes and return as int8
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int8 derived from bytes
     */
    function popInt8(Bytes32.Builder memory self) internal pure returns (int8 element) {
        unchecked {
            self._size -= 8;
            bytes32 elementBytes = (self._data >> self._size) & MASK_01;
            element = int8(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_01 << self._size);
        }
    }

    /**
     * @notice remove first 1-byte segment from bytes and return as int8
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int8 derived from bytes
     */
    function shiftInt8(Bytes32.Builder memory self) internal pure returns (int8 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_01;
            element = int8(Bytes32.toInt256(elementBytes));
            self._data >>= 8;
            self._size -= 8;
        }
    }

    /**
     * @notice insert int8 value to 1-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int8 to add
     */
    function unshiftInt8(Bytes32.Builder memory self, int8 element) internal pure {
        unchecked {
            self._data = (self._data << 8) | (Int256.toBytes32(element) & (~bytes32(0) >> 248));
            self._size += 8;
        }
    }
    /**
     * @notice parse uint8 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint8 derived from bytes
     */
    function parseUint8(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint8 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_01;
        element = uint8(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint8 value to 1-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint8 to insert
     * @param offset slot offset in bits
     */
    function insertUint8(Bytes32.Builder memory self, uint8 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_01 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 8 + offset) self._size = 8 + offset;
        }
    }

    /**
     * @notice insert uint8 value to 1-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint8 to add
     */
    function pushUint8(Bytes32.Builder memory self, uint8 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 8;
        }
    }

    /**
     * @notice remove last 1-byte segment from bytes and return as uint8
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint8 derived from bytes
     */
    function popUint8(Bytes32.Builder memory self) internal pure returns (uint8 element) {
        unchecked {
            self._size -= 8;
            bytes32 elementBytes = (self._data >> self._size) & MASK_01;
            element = uint8(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_01 << self._size);
        }
    }

    /**
     * @notice remove first 1-byte segment from bytes and return as uint8
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint8 derived from bytes
     */
    function shiftUint8(Bytes32.Builder memory self) internal pure returns (uint8 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_01;
            element = uint8(Bytes32.toUint256(elementBytes));
            self._data >>= 8;
            self._size -= 8;
        }
    }

    /**
     * @notice insert uint8 value to 1-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint8 to add
     */
    function unshiftUint8(Bytes32.Builder memory self, uint8 element) internal pure {
        unchecked {
            self._data = (self._data << 8) | Uint256.toBytes32(element);
            self._size += 8;
        }
    }
    /**
     * @notice parse bool from bytes at given offset
     * @param offset slot offset in bits
     * @return element bool derived from bytes
     */
    function parseBool(Bytes32.Builder memory self, uint256 offset) internal pure returns (bool element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_01;
        element = Bytes32.toBool(elementBytes);
    }

    /**
     * @notice insert bool value to 1-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bool to insert
     * @param offset slot offset in bits
     */
    function insertBool(Bytes32.Builder memory self, bool element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_01 << offset) | (Bool.toBytes32(element) << offset);
            if (self._size < 8 + offset) self._size = 8 + offset;
        }
    }

    /**
     * @notice insert bool value to 1-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bool to add
     */
    function pushBool(Bytes32.Builder memory self, bool element) internal pure {
        unchecked {
            self._data |= Bool.toBytes32(element) << self._size;
            self._size += 8;
        }
    }

    /**
     * @notice remove last 1-byte segment from bytes and return as bool
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bool derived from bytes
     */
    function popBool(Bytes32.Builder memory self) internal pure returns (bool element) {
        unchecked {
            self._size -= 8;
            bytes32 elementBytes = (self._data >> self._size) & MASK_01;
            element = Bytes32.toBool(elementBytes);
            self._data &= ~(MASK_01 << self._size);
        }
    }

    /**
     * @notice remove first 1-byte segment from bytes and return as bool
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bool derived from bytes
     */
    function shiftBool(Bytes32.Builder memory self) internal pure returns (bool element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_01;
            element = Bytes32.toBool(elementBytes);
            self._data >>= 8;
            self._size -= 8;
        }
    }

    /**
     * @notice insert bool value to 1-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bool to add
     */
    function unshiftBool(Bytes32.Builder memory self, bool element) internal pure {
        unchecked {
            self._data = (self._data << 8) | Bool.toBytes32(element);
            self._size += 8;
        }
    }
    /**
     * @notice parse bytes2 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes2 derived from bytes
     */
    function parseBytes2(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes2 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_02;
        element = bytes2(elementBytes << 240);
    }

    /**
     * @notice insert bytes2 value to 2-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes2 to insert
     * @param offset slot offset in bits
     */
    function insertBytes2(Bytes32.Builder memory self, bytes2 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_02 << offset) | (bytes32(element) >> 240 << offset);
            if (self._size < 16 + offset) self._size = 16 + offset;
        }
    }

    /**
     * @notice insert bytes2 value to 2-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes2 to add
     */
    function pushBytes2(Bytes32.Builder memory self, bytes2 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 240 << self._size;
            self._size += 16;
        }
    }

    /**
     * @notice remove last 2-byte segment from bytes and return as bytes2
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes2 derived from bytes
     */
    function popBytes2(Bytes32.Builder memory self) internal pure returns (bytes2 element) {
        unchecked {
            self._size -= 16;
            bytes32 elementBytes = (self._data >> self._size) & MASK_02;
            element = bytes2(elementBytes << 240);
            self._data &= ~(MASK_02 << self._size);
        }
    }

    /**
     * @notice remove first 2-byte segment from bytes and return as bytes2
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes2 derived from bytes
     */
    function shiftBytes2(Bytes32.Builder memory self) internal pure returns (bytes2 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_02;
            element = bytes2(elementBytes << 240);
            self._data >>= 16;
            self._size -= 16;
        }
    }

    /**
     * @notice insert bytes2 value to 2-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes2 to add
     */
    function unshiftBytes2(Bytes32.Builder memory self, bytes2 element) internal pure {
        unchecked {
            self._data = (self._data << 16) | bytes32(element) >> 240;
            self._size += 16;
        }
    }
    /**
     * @notice parse int16 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int16 derived from bytes
     */
    function parseInt16(Bytes32.Builder memory self, uint256 offset) internal pure returns (int16 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_02;
        element = int16(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int16 value to 2-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int16 to insert
     * @param offset slot offset in bits
     */
    function insertInt16(Bytes32.Builder memory self, int16 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_02 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 240)) << offset);
            if (self._size < 16 + offset) self._size = 16 + offset;
        }
    }

    /**
     * @notice insert int16 value to 2-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int16 to add
     */
    function pushInt16(Bytes32.Builder memory self, int16 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 240)) << self._size;
            self._size += 16;
        }
    }

    /**
     * @notice remove last 2-byte segment from bytes and return as int16
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int16 derived from bytes
     */
    function popInt16(Bytes32.Builder memory self) internal pure returns (int16 element) {
        unchecked {
            self._size -= 16;
            bytes32 elementBytes = (self._data >> self._size) & MASK_02;
            element = int16(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_02 << self._size);
        }
    }

    /**
     * @notice remove first 2-byte segment from bytes and return as int16
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int16 derived from bytes
     */
    function shiftInt16(Bytes32.Builder memory self) internal pure returns (int16 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_02;
            element = int16(Bytes32.toInt256(elementBytes));
            self._data >>= 16;
            self._size -= 16;
        }
    }

    /**
     * @notice insert int16 value to 2-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int16 to add
     */
    function unshiftInt16(Bytes32.Builder memory self, int16 element) internal pure {
        unchecked {
            self._data = (self._data << 16) | (Int256.toBytes32(element) & (~bytes32(0) >> 240));
            self._size += 16;
        }
    }
    /**
     * @notice parse uint16 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint16 derived from bytes
     */
    function parseUint16(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint16 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_02;
        element = uint16(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint16 value to 2-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint16 to insert
     * @param offset slot offset in bits
     */
    function insertUint16(Bytes32.Builder memory self, uint16 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_02 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 16 + offset) self._size = 16 + offset;
        }
    }

    /**
     * @notice insert uint16 value to 2-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint16 to add
     */
    function pushUint16(Bytes32.Builder memory self, uint16 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 16;
        }
    }

    /**
     * @notice remove last 2-byte segment from bytes and return as uint16
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint16 derived from bytes
     */
    function popUint16(Bytes32.Builder memory self) internal pure returns (uint16 element) {
        unchecked {
            self._size -= 16;
            bytes32 elementBytes = (self._data >> self._size) & MASK_02;
            element = uint16(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_02 << self._size);
        }
    }

    /**
     * @notice remove first 2-byte segment from bytes and return as uint16
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint16 derived from bytes
     */
    function shiftUint16(Bytes32.Builder memory self) internal pure returns (uint16 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_02;
            element = uint16(Bytes32.toUint256(elementBytes));
            self._data >>= 16;
            self._size -= 16;
        }
    }

    /**
     * @notice insert uint16 value to 2-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint16 to add
     */
    function unshiftUint16(Bytes32.Builder memory self, uint16 element) internal pure {
        unchecked {
            self._data = (self._data << 16) | Uint256.toBytes32(element);
            self._size += 16;
        }
    }
    /**
     * @notice parse bytes3 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes3 derived from bytes
     */
    function parseBytes3(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes3 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_03;
        element = bytes3(elementBytes << 232);
    }

    /**
     * @notice insert bytes3 value to 3-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes3 to insert
     * @param offset slot offset in bits
     */
    function insertBytes3(Bytes32.Builder memory self, bytes3 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_03 << offset) | (bytes32(element) >> 232 << offset);
            if (self._size < 24 + offset) self._size = 24 + offset;
        }
    }

    /**
     * @notice insert bytes3 value to 3-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes3 to add
     */
    function pushBytes3(Bytes32.Builder memory self, bytes3 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 232 << self._size;
            self._size += 24;
        }
    }

    /**
     * @notice remove last 3-byte segment from bytes and return as bytes3
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes3 derived from bytes
     */
    function popBytes3(Bytes32.Builder memory self) internal pure returns (bytes3 element) {
        unchecked {
            self._size -= 24;
            bytes32 elementBytes = (self._data >> self._size) & MASK_03;
            element = bytes3(elementBytes << 232);
            self._data &= ~(MASK_03 << self._size);
        }
    }

    /**
     * @notice remove first 3-byte segment from bytes and return as bytes3
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes3 derived from bytes
     */
    function shiftBytes3(Bytes32.Builder memory self) internal pure returns (bytes3 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_03;
            element = bytes3(elementBytes << 232);
            self._data >>= 24;
            self._size -= 24;
        }
    }

    /**
     * @notice insert bytes3 value to 3-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes3 to add
     */
    function unshiftBytes3(Bytes32.Builder memory self, bytes3 element) internal pure {
        unchecked {
            self._data = (self._data << 24) | bytes32(element) >> 232;
            self._size += 24;
        }
    }
    /**
     * @notice parse int24 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int24 derived from bytes
     */
    function parseInt24(Bytes32.Builder memory self, uint256 offset) internal pure returns (int24 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_03;
        element = int24(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int24 value to 3-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int24 to insert
     * @param offset slot offset in bits
     */
    function insertInt24(Bytes32.Builder memory self, int24 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_03 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 232)) << offset);
            if (self._size < 24 + offset) self._size = 24 + offset;
        }
    }

    /**
     * @notice insert int24 value to 3-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int24 to add
     */
    function pushInt24(Bytes32.Builder memory self, int24 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 232)) << self._size;
            self._size += 24;
        }
    }

    /**
     * @notice remove last 3-byte segment from bytes and return as int24
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int24 derived from bytes
     */
    function popInt24(Bytes32.Builder memory self) internal pure returns (int24 element) {
        unchecked {
            self._size -= 24;
            bytes32 elementBytes = (self._data >> self._size) & MASK_03;
            element = int24(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_03 << self._size);
        }
    }

    /**
     * @notice remove first 3-byte segment from bytes and return as int24
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int24 derived from bytes
     */
    function shiftInt24(Bytes32.Builder memory self) internal pure returns (int24 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_03;
            element = int24(Bytes32.toInt256(elementBytes));
            self._data >>= 24;
            self._size -= 24;
        }
    }

    /**
     * @notice insert int24 value to 3-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int24 to add
     */
    function unshiftInt24(Bytes32.Builder memory self, int24 element) internal pure {
        unchecked {
            self._data = (self._data << 24) | (Int256.toBytes32(element) & (~bytes32(0) >> 232));
            self._size += 24;
        }
    }
    /**
     * @notice parse uint24 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint24 derived from bytes
     */
    function parseUint24(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint24 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_03;
        element = uint24(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint24 value to 3-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint24 to insert
     * @param offset slot offset in bits
     */
    function insertUint24(Bytes32.Builder memory self, uint24 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_03 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 24 + offset) self._size = 24 + offset;
        }
    }

    /**
     * @notice insert uint24 value to 3-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint24 to add
     */
    function pushUint24(Bytes32.Builder memory self, uint24 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 24;
        }
    }

    /**
     * @notice remove last 3-byte segment from bytes and return as uint24
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint24 derived from bytes
     */
    function popUint24(Bytes32.Builder memory self) internal pure returns (uint24 element) {
        unchecked {
            self._size -= 24;
            bytes32 elementBytes = (self._data >> self._size) & MASK_03;
            element = uint24(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_03 << self._size);
        }
    }

    /**
     * @notice remove first 3-byte segment from bytes and return as uint24
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint24 derived from bytes
     */
    function shiftUint24(Bytes32.Builder memory self) internal pure returns (uint24 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_03;
            element = uint24(Bytes32.toUint256(elementBytes));
            self._data >>= 24;
            self._size -= 24;
        }
    }

    /**
     * @notice insert uint24 value to 3-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint24 to add
     */
    function unshiftUint24(Bytes32.Builder memory self, uint24 element) internal pure {
        unchecked {
            self._data = (self._data << 24) | Uint256.toBytes32(element);
            self._size += 24;
        }
    }
    /**
     * @notice parse bytes4 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes4 derived from bytes
     */
    function parseBytes4(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes4 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_04;
        element = bytes4(elementBytes << 224);
    }

    /**
     * @notice insert bytes4 value to 4-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes4 to insert
     * @param offset slot offset in bits
     */
    function insertBytes4(Bytes32.Builder memory self, bytes4 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_04 << offset) | (bytes32(element) >> 224 << offset);
            if (self._size < 32 + offset) self._size = 32 + offset;
        }
    }

    /**
     * @notice insert bytes4 value to 4-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes4 to add
     */
    function pushBytes4(Bytes32.Builder memory self, bytes4 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 224 << self._size;
            self._size += 32;
        }
    }

    /**
     * @notice remove last 4-byte segment from bytes and return as bytes4
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes4 derived from bytes
     */
    function popBytes4(Bytes32.Builder memory self) internal pure returns (bytes4 element) {
        unchecked {
            self._size -= 32;
            bytes32 elementBytes = (self._data >> self._size) & MASK_04;
            element = bytes4(elementBytes << 224);
            self._data &= ~(MASK_04 << self._size);
        }
    }

    /**
     * @notice remove first 4-byte segment from bytes and return as bytes4
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes4 derived from bytes
     */
    function shiftBytes4(Bytes32.Builder memory self) internal pure returns (bytes4 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_04;
            element = bytes4(elementBytes << 224);
            self._data >>= 32;
            self._size -= 32;
        }
    }

    /**
     * @notice insert bytes4 value to 4-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes4 to add
     */
    function unshiftBytes4(Bytes32.Builder memory self, bytes4 element) internal pure {
        unchecked {
            self._data = (self._data << 32) | bytes32(element) >> 224;
            self._size += 32;
        }
    }
    /**
     * @notice parse int32 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int32 derived from bytes
     */
    function parseInt32(Bytes32.Builder memory self, uint256 offset) internal pure returns (int32 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_04;
        element = int32(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int32 value to 4-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int32 to insert
     * @param offset slot offset in bits
     */
    function insertInt32(Bytes32.Builder memory self, int32 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_04 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 224)) << offset);
            if (self._size < 32 + offset) self._size = 32 + offset;
        }
    }

    /**
     * @notice insert int32 value to 4-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int32 to add
     */
    function pushInt32(Bytes32.Builder memory self, int32 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 224)) << self._size;
            self._size += 32;
        }
    }

    /**
     * @notice remove last 4-byte segment from bytes and return as int32
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int32 derived from bytes
     */
    function popInt32(Bytes32.Builder memory self) internal pure returns (int32 element) {
        unchecked {
            self._size -= 32;
            bytes32 elementBytes = (self._data >> self._size) & MASK_04;
            element = int32(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_04 << self._size);
        }
    }

    /**
     * @notice remove first 4-byte segment from bytes and return as int32
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int32 derived from bytes
     */
    function shiftInt32(Bytes32.Builder memory self) internal pure returns (int32 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_04;
            element = int32(Bytes32.toInt256(elementBytes));
            self._data >>= 32;
            self._size -= 32;
        }
    }

    /**
     * @notice insert int32 value to 4-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int32 to add
     */
    function unshiftInt32(Bytes32.Builder memory self, int32 element) internal pure {
        unchecked {
            self._data = (self._data << 32) | (Int256.toBytes32(element) & (~bytes32(0) >> 224));
            self._size += 32;
        }
    }
    /**
     * @notice parse uint32 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint32 derived from bytes
     */
    function parseUint32(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint32 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_04;
        element = uint32(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint32 value to 4-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint32 to insert
     * @param offset slot offset in bits
     */
    function insertUint32(Bytes32.Builder memory self, uint32 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_04 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 32 + offset) self._size = 32 + offset;
        }
    }

    /**
     * @notice insert uint32 value to 4-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint32 to add
     */
    function pushUint32(Bytes32.Builder memory self, uint32 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 32;
        }
    }

    /**
     * @notice remove last 4-byte segment from bytes and return as uint32
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint32 derived from bytes
     */
    function popUint32(Bytes32.Builder memory self) internal pure returns (uint32 element) {
        unchecked {
            self._size -= 32;
            bytes32 elementBytes = (self._data >> self._size) & MASK_04;
            element = uint32(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_04 << self._size);
        }
    }

    /**
     * @notice remove first 4-byte segment from bytes and return as uint32
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint32 derived from bytes
     */
    function shiftUint32(Bytes32.Builder memory self) internal pure returns (uint32 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_04;
            element = uint32(Bytes32.toUint256(elementBytes));
            self._data >>= 32;
            self._size -= 32;
        }
    }

    /**
     * @notice insert uint32 value to 4-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint32 to add
     */
    function unshiftUint32(Bytes32.Builder memory self, uint32 element) internal pure {
        unchecked {
            self._data = (self._data << 32) | Uint256.toBytes32(element);
            self._size += 32;
        }
    }
    /**
     * @notice parse bytes5 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes5 derived from bytes
     */
    function parseBytes5(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes5 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_05;
        element = bytes5(elementBytes << 216);
    }

    /**
     * @notice insert bytes5 value to 5-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes5 to insert
     * @param offset slot offset in bits
     */
    function insertBytes5(Bytes32.Builder memory self, bytes5 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_05 << offset) | (bytes32(element) >> 216 << offset);
            if (self._size < 40 + offset) self._size = 40 + offset;
        }
    }

    /**
     * @notice insert bytes5 value to 5-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes5 to add
     */
    function pushBytes5(Bytes32.Builder memory self, bytes5 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 216 << self._size;
            self._size += 40;
        }
    }

    /**
     * @notice remove last 5-byte segment from bytes and return as bytes5
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes5 derived from bytes
     */
    function popBytes5(Bytes32.Builder memory self) internal pure returns (bytes5 element) {
        unchecked {
            self._size -= 40;
            bytes32 elementBytes = (self._data >> self._size) & MASK_05;
            element = bytes5(elementBytes << 216);
            self._data &= ~(MASK_05 << self._size);
        }
    }

    /**
     * @notice remove first 5-byte segment from bytes and return as bytes5
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes5 derived from bytes
     */
    function shiftBytes5(Bytes32.Builder memory self) internal pure returns (bytes5 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_05;
            element = bytes5(elementBytes << 216);
            self._data >>= 40;
            self._size -= 40;
        }
    }

    /**
     * @notice insert bytes5 value to 5-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes5 to add
     */
    function unshiftBytes5(Bytes32.Builder memory self, bytes5 element) internal pure {
        unchecked {
            self._data = (self._data << 40) | bytes32(element) >> 216;
            self._size += 40;
        }
    }
    /**
     * @notice parse int40 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int40 derived from bytes
     */
    function parseInt40(Bytes32.Builder memory self, uint256 offset) internal pure returns (int40 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_05;
        element = int40(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int40 value to 5-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int40 to insert
     * @param offset slot offset in bits
     */
    function insertInt40(Bytes32.Builder memory self, int40 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_05 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 216)) << offset);
            if (self._size < 40 + offset) self._size = 40 + offset;
        }
    }

    /**
     * @notice insert int40 value to 5-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int40 to add
     */
    function pushInt40(Bytes32.Builder memory self, int40 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 216)) << self._size;
            self._size += 40;
        }
    }

    /**
     * @notice remove last 5-byte segment from bytes and return as int40
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int40 derived from bytes
     */
    function popInt40(Bytes32.Builder memory self) internal pure returns (int40 element) {
        unchecked {
            self._size -= 40;
            bytes32 elementBytes = (self._data >> self._size) & MASK_05;
            element = int40(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_05 << self._size);
        }
    }

    /**
     * @notice remove first 5-byte segment from bytes and return as int40
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int40 derived from bytes
     */
    function shiftInt40(Bytes32.Builder memory self) internal pure returns (int40 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_05;
            element = int40(Bytes32.toInt256(elementBytes));
            self._data >>= 40;
            self._size -= 40;
        }
    }

    /**
     * @notice insert int40 value to 5-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int40 to add
     */
    function unshiftInt40(Bytes32.Builder memory self, int40 element) internal pure {
        unchecked {
            self._data = (self._data << 40) | (Int256.toBytes32(element) & (~bytes32(0) >> 216));
            self._size += 40;
        }
    }
    /**
     * @notice parse uint40 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint40 derived from bytes
     */
    function parseUint40(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint40 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_05;
        element = uint40(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint40 value to 5-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint40 to insert
     * @param offset slot offset in bits
     */
    function insertUint40(Bytes32.Builder memory self, uint40 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_05 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 40 + offset) self._size = 40 + offset;
        }
    }

    /**
     * @notice insert uint40 value to 5-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint40 to add
     */
    function pushUint40(Bytes32.Builder memory self, uint40 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 40;
        }
    }

    /**
     * @notice remove last 5-byte segment from bytes and return as uint40
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint40 derived from bytes
     */
    function popUint40(Bytes32.Builder memory self) internal pure returns (uint40 element) {
        unchecked {
            self._size -= 40;
            bytes32 elementBytes = (self._data >> self._size) & MASK_05;
            element = uint40(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_05 << self._size);
        }
    }

    /**
     * @notice remove first 5-byte segment from bytes and return as uint40
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint40 derived from bytes
     */
    function shiftUint40(Bytes32.Builder memory self) internal pure returns (uint40 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_05;
            element = uint40(Bytes32.toUint256(elementBytes));
            self._data >>= 40;
            self._size -= 40;
        }
    }

    /**
     * @notice insert uint40 value to 5-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint40 to add
     */
    function unshiftUint40(Bytes32.Builder memory self, uint40 element) internal pure {
        unchecked {
            self._data = (self._data << 40) | Uint256.toBytes32(element);
            self._size += 40;
        }
    }
    /**
     * @notice parse bytes6 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes6 derived from bytes
     */
    function parseBytes6(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes6 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_06;
        element = bytes6(elementBytes << 208);
    }

    /**
     * @notice insert bytes6 value to 6-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes6 to insert
     * @param offset slot offset in bits
     */
    function insertBytes6(Bytes32.Builder memory self, bytes6 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_06 << offset) | (bytes32(element) >> 208 << offset);
            if (self._size < 48 + offset) self._size = 48 + offset;
        }
    }

    /**
     * @notice insert bytes6 value to 6-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes6 to add
     */
    function pushBytes6(Bytes32.Builder memory self, bytes6 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 208 << self._size;
            self._size += 48;
        }
    }

    /**
     * @notice remove last 6-byte segment from bytes and return as bytes6
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes6 derived from bytes
     */
    function popBytes6(Bytes32.Builder memory self) internal pure returns (bytes6 element) {
        unchecked {
            self._size -= 48;
            bytes32 elementBytes = (self._data >> self._size) & MASK_06;
            element = bytes6(elementBytes << 208);
            self._data &= ~(MASK_06 << self._size);
        }
    }

    /**
     * @notice remove first 6-byte segment from bytes and return as bytes6
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes6 derived from bytes
     */
    function shiftBytes6(Bytes32.Builder memory self) internal pure returns (bytes6 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_06;
            element = bytes6(elementBytes << 208);
            self._data >>= 48;
            self._size -= 48;
        }
    }

    /**
     * @notice insert bytes6 value to 6-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes6 to add
     */
    function unshiftBytes6(Bytes32.Builder memory self, bytes6 element) internal pure {
        unchecked {
            self._data = (self._data << 48) | bytes32(element) >> 208;
            self._size += 48;
        }
    }
    /**
     * @notice parse int48 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int48 derived from bytes
     */
    function parseInt48(Bytes32.Builder memory self, uint256 offset) internal pure returns (int48 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_06;
        element = int48(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int48 value to 6-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int48 to insert
     * @param offset slot offset in bits
     */
    function insertInt48(Bytes32.Builder memory self, int48 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_06 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 208)) << offset);
            if (self._size < 48 + offset) self._size = 48 + offset;
        }
    }

    /**
     * @notice insert int48 value to 6-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int48 to add
     */
    function pushInt48(Bytes32.Builder memory self, int48 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 208)) << self._size;
            self._size += 48;
        }
    }

    /**
     * @notice remove last 6-byte segment from bytes and return as int48
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int48 derived from bytes
     */
    function popInt48(Bytes32.Builder memory self) internal pure returns (int48 element) {
        unchecked {
            self._size -= 48;
            bytes32 elementBytes = (self._data >> self._size) & MASK_06;
            element = int48(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_06 << self._size);
        }
    }

    /**
     * @notice remove first 6-byte segment from bytes and return as int48
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int48 derived from bytes
     */
    function shiftInt48(Bytes32.Builder memory self) internal pure returns (int48 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_06;
            element = int48(Bytes32.toInt256(elementBytes));
            self._data >>= 48;
            self._size -= 48;
        }
    }

    /**
     * @notice insert int48 value to 6-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int48 to add
     */
    function unshiftInt48(Bytes32.Builder memory self, int48 element) internal pure {
        unchecked {
            self._data = (self._data << 48) | (Int256.toBytes32(element) & (~bytes32(0) >> 208));
            self._size += 48;
        }
    }
    /**
     * @notice parse uint48 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint48 derived from bytes
     */
    function parseUint48(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint48 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_06;
        element = uint48(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint48 value to 6-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint48 to insert
     * @param offset slot offset in bits
     */
    function insertUint48(Bytes32.Builder memory self, uint48 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_06 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 48 + offset) self._size = 48 + offset;
        }
    }

    /**
     * @notice insert uint48 value to 6-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint48 to add
     */
    function pushUint48(Bytes32.Builder memory self, uint48 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 48;
        }
    }

    /**
     * @notice remove last 6-byte segment from bytes and return as uint48
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint48 derived from bytes
     */
    function popUint48(Bytes32.Builder memory self) internal pure returns (uint48 element) {
        unchecked {
            self._size -= 48;
            bytes32 elementBytes = (self._data >> self._size) & MASK_06;
            element = uint48(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_06 << self._size);
        }
    }

    /**
     * @notice remove first 6-byte segment from bytes and return as uint48
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint48 derived from bytes
     */
    function shiftUint48(Bytes32.Builder memory self) internal pure returns (uint48 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_06;
            element = uint48(Bytes32.toUint256(elementBytes));
            self._data >>= 48;
            self._size -= 48;
        }
    }

    /**
     * @notice insert uint48 value to 6-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint48 to add
     */
    function unshiftUint48(Bytes32.Builder memory self, uint48 element) internal pure {
        unchecked {
            self._data = (self._data << 48) | Uint256.toBytes32(element);
            self._size += 48;
        }
    }
    /**
     * @notice parse bytes7 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes7 derived from bytes
     */
    function parseBytes7(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes7 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_07;
        element = bytes7(elementBytes << 200);
    }

    /**
     * @notice insert bytes7 value to 7-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes7 to insert
     * @param offset slot offset in bits
     */
    function insertBytes7(Bytes32.Builder memory self, bytes7 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_07 << offset) | (bytes32(element) >> 200 << offset);
            if (self._size < 56 + offset) self._size = 56 + offset;
        }
    }

    /**
     * @notice insert bytes7 value to 7-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes7 to add
     */
    function pushBytes7(Bytes32.Builder memory self, bytes7 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 200 << self._size;
            self._size += 56;
        }
    }

    /**
     * @notice remove last 7-byte segment from bytes and return as bytes7
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes7 derived from bytes
     */
    function popBytes7(Bytes32.Builder memory self) internal pure returns (bytes7 element) {
        unchecked {
            self._size -= 56;
            bytes32 elementBytes = (self._data >> self._size) & MASK_07;
            element = bytes7(elementBytes << 200);
            self._data &= ~(MASK_07 << self._size);
        }
    }

    /**
     * @notice remove first 7-byte segment from bytes and return as bytes7
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes7 derived from bytes
     */
    function shiftBytes7(Bytes32.Builder memory self) internal pure returns (bytes7 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_07;
            element = bytes7(elementBytes << 200);
            self._data >>= 56;
            self._size -= 56;
        }
    }

    /**
     * @notice insert bytes7 value to 7-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes7 to add
     */
    function unshiftBytes7(Bytes32.Builder memory self, bytes7 element) internal pure {
        unchecked {
            self._data = (self._data << 56) | bytes32(element) >> 200;
            self._size += 56;
        }
    }
    /**
     * @notice parse int56 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int56 derived from bytes
     */
    function parseInt56(Bytes32.Builder memory self, uint256 offset) internal pure returns (int56 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_07;
        element = int56(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int56 value to 7-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int56 to insert
     * @param offset slot offset in bits
     */
    function insertInt56(Bytes32.Builder memory self, int56 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_07 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 200)) << offset);
            if (self._size < 56 + offset) self._size = 56 + offset;
        }
    }

    /**
     * @notice insert int56 value to 7-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int56 to add
     */
    function pushInt56(Bytes32.Builder memory self, int56 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 200)) << self._size;
            self._size += 56;
        }
    }

    /**
     * @notice remove last 7-byte segment from bytes and return as int56
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int56 derived from bytes
     */
    function popInt56(Bytes32.Builder memory self) internal pure returns (int56 element) {
        unchecked {
            self._size -= 56;
            bytes32 elementBytes = (self._data >> self._size) & MASK_07;
            element = int56(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_07 << self._size);
        }
    }

    /**
     * @notice remove first 7-byte segment from bytes and return as int56
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int56 derived from bytes
     */
    function shiftInt56(Bytes32.Builder memory self) internal pure returns (int56 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_07;
            element = int56(Bytes32.toInt256(elementBytes));
            self._data >>= 56;
            self._size -= 56;
        }
    }

    /**
     * @notice insert int56 value to 7-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int56 to add
     */
    function unshiftInt56(Bytes32.Builder memory self, int56 element) internal pure {
        unchecked {
            self._data = (self._data << 56) | (Int256.toBytes32(element) & (~bytes32(0) >> 200));
            self._size += 56;
        }
    }
    /**
     * @notice parse uint56 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint56 derived from bytes
     */
    function parseUint56(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint56 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_07;
        element = uint56(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint56 value to 7-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint56 to insert
     * @param offset slot offset in bits
     */
    function insertUint56(Bytes32.Builder memory self, uint56 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_07 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 56 + offset) self._size = 56 + offset;
        }
    }

    /**
     * @notice insert uint56 value to 7-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint56 to add
     */
    function pushUint56(Bytes32.Builder memory self, uint56 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 56;
        }
    }

    /**
     * @notice remove last 7-byte segment from bytes and return as uint56
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint56 derived from bytes
     */
    function popUint56(Bytes32.Builder memory self) internal pure returns (uint56 element) {
        unchecked {
            self._size -= 56;
            bytes32 elementBytes = (self._data >> self._size) & MASK_07;
            element = uint56(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_07 << self._size);
        }
    }

    /**
     * @notice remove first 7-byte segment from bytes and return as uint56
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint56 derived from bytes
     */
    function shiftUint56(Bytes32.Builder memory self) internal pure returns (uint56 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_07;
            element = uint56(Bytes32.toUint256(elementBytes));
            self._data >>= 56;
            self._size -= 56;
        }
    }

    /**
     * @notice insert uint56 value to 7-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint56 to add
     */
    function unshiftUint56(Bytes32.Builder memory self, uint56 element) internal pure {
        unchecked {
            self._data = (self._data << 56) | Uint256.toBytes32(element);
            self._size += 56;
        }
    }
    /**
     * @notice parse bytes8 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes8 derived from bytes
     */
    function parseBytes8(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes8 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_08;
        element = bytes8(elementBytes << 192);
    }

    /**
     * @notice insert bytes8 value to 8-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes8 to insert
     * @param offset slot offset in bits
     */
    function insertBytes8(Bytes32.Builder memory self, bytes8 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_08 << offset) | (bytes32(element) >> 192 << offset);
            if (self._size < 64 + offset) self._size = 64 + offset;
        }
    }

    /**
     * @notice insert bytes8 value to 8-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes8 to add
     */
    function pushBytes8(Bytes32.Builder memory self, bytes8 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 192 << self._size;
            self._size += 64;
        }
    }

    /**
     * @notice remove last 8-byte segment from bytes and return as bytes8
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes8 derived from bytes
     */
    function popBytes8(Bytes32.Builder memory self) internal pure returns (bytes8 element) {
        unchecked {
            self._size -= 64;
            bytes32 elementBytes = (self._data >> self._size) & MASK_08;
            element = bytes8(elementBytes << 192);
            self._data &= ~(MASK_08 << self._size);
        }
    }

    /**
     * @notice remove first 8-byte segment from bytes and return as bytes8
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes8 derived from bytes
     */
    function shiftBytes8(Bytes32.Builder memory self) internal pure returns (bytes8 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_08;
            element = bytes8(elementBytes << 192);
            self._data >>= 64;
            self._size -= 64;
        }
    }

    /**
     * @notice insert bytes8 value to 8-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes8 to add
     */
    function unshiftBytes8(Bytes32.Builder memory self, bytes8 element) internal pure {
        unchecked {
            self._data = (self._data << 64) | bytes32(element) >> 192;
            self._size += 64;
        }
    }
    /**
     * @notice parse int64 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int64 derived from bytes
     */
    function parseInt64(Bytes32.Builder memory self, uint256 offset) internal pure returns (int64 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_08;
        element = int64(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int64 value to 8-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int64 to insert
     * @param offset slot offset in bits
     */
    function insertInt64(Bytes32.Builder memory self, int64 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_08 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 192)) << offset);
            if (self._size < 64 + offset) self._size = 64 + offset;
        }
    }

    /**
     * @notice insert int64 value to 8-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int64 to add
     */
    function pushInt64(Bytes32.Builder memory self, int64 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 192)) << self._size;
            self._size += 64;
        }
    }

    /**
     * @notice remove last 8-byte segment from bytes and return as int64
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int64 derived from bytes
     */
    function popInt64(Bytes32.Builder memory self) internal pure returns (int64 element) {
        unchecked {
            self._size -= 64;
            bytes32 elementBytes = (self._data >> self._size) & MASK_08;
            element = int64(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_08 << self._size);
        }
    }

    /**
     * @notice remove first 8-byte segment from bytes and return as int64
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int64 derived from bytes
     */
    function shiftInt64(Bytes32.Builder memory self) internal pure returns (int64 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_08;
            element = int64(Bytes32.toInt256(elementBytes));
            self._data >>= 64;
            self._size -= 64;
        }
    }

    /**
     * @notice insert int64 value to 8-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int64 to add
     */
    function unshiftInt64(Bytes32.Builder memory self, int64 element) internal pure {
        unchecked {
            self._data = (self._data << 64) | (Int256.toBytes32(element) & (~bytes32(0) >> 192));
            self._size += 64;
        }
    }
    /**
     * @notice parse uint64 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint64 derived from bytes
     */
    function parseUint64(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint64 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_08;
        element = uint64(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint64 value to 8-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint64 to insert
     * @param offset slot offset in bits
     */
    function insertUint64(Bytes32.Builder memory self, uint64 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_08 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 64 + offset) self._size = 64 + offset;
        }
    }

    /**
     * @notice insert uint64 value to 8-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint64 to add
     */
    function pushUint64(Bytes32.Builder memory self, uint64 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 64;
        }
    }

    /**
     * @notice remove last 8-byte segment from bytes and return as uint64
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint64 derived from bytes
     */
    function popUint64(Bytes32.Builder memory self) internal pure returns (uint64 element) {
        unchecked {
            self._size -= 64;
            bytes32 elementBytes = (self._data >> self._size) & MASK_08;
            element = uint64(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_08 << self._size);
        }
    }

    /**
     * @notice remove first 8-byte segment from bytes and return as uint64
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint64 derived from bytes
     */
    function shiftUint64(Bytes32.Builder memory self) internal pure returns (uint64 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_08;
            element = uint64(Bytes32.toUint256(elementBytes));
            self._data >>= 64;
            self._size -= 64;
        }
    }

    /**
     * @notice insert uint64 value to 8-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint64 to add
     */
    function unshiftUint64(Bytes32.Builder memory self, uint64 element) internal pure {
        unchecked {
            self._data = (self._data << 64) | Uint256.toBytes32(element);
            self._size += 64;
        }
    }
    /**
     * @notice parse bytes9 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes9 derived from bytes
     */
    function parseBytes9(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes9 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_09;
        element = bytes9(elementBytes << 184);
    }

    /**
     * @notice insert bytes9 value to 9-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes9 to insert
     * @param offset slot offset in bits
     */
    function insertBytes9(Bytes32.Builder memory self, bytes9 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_09 << offset) | (bytes32(element) >> 184 << offset);
            if (self._size < 72 + offset) self._size = 72 + offset;
        }
    }

    /**
     * @notice insert bytes9 value to 9-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes9 to add
     */
    function pushBytes9(Bytes32.Builder memory self, bytes9 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 184 << self._size;
            self._size += 72;
        }
    }

    /**
     * @notice remove last 9-byte segment from bytes and return as bytes9
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes9 derived from bytes
     */
    function popBytes9(Bytes32.Builder memory self) internal pure returns (bytes9 element) {
        unchecked {
            self._size -= 72;
            bytes32 elementBytes = (self._data >> self._size) & MASK_09;
            element = bytes9(elementBytes << 184);
            self._data &= ~(MASK_09 << self._size);
        }
    }

    /**
     * @notice remove first 9-byte segment from bytes and return as bytes9
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes9 derived from bytes
     */
    function shiftBytes9(Bytes32.Builder memory self) internal pure returns (bytes9 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_09;
            element = bytes9(elementBytes << 184);
            self._data >>= 72;
            self._size -= 72;
        }
    }

    /**
     * @notice insert bytes9 value to 9-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes9 to add
     */
    function unshiftBytes9(Bytes32.Builder memory self, bytes9 element) internal pure {
        unchecked {
            self._data = (self._data << 72) | bytes32(element) >> 184;
            self._size += 72;
        }
    }
    /**
     * @notice parse int72 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int72 derived from bytes
     */
    function parseInt72(Bytes32.Builder memory self, uint256 offset) internal pure returns (int72 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_09;
        element = int72(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int72 value to 9-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int72 to insert
     * @param offset slot offset in bits
     */
    function insertInt72(Bytes32.Builder memory self, int72 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_09 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 184)) << offset);
            if (self._size < 72 + offset) self._size = 72 + offset;
        }
    }

    /**
     * @notice insert int72 value to 9-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int72 to add
     */
    function pushInt72(Bytes32.Builder memory self, int72 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 184)) << self._size;
            self._size += 72;
        }
    }

    /**
     * @notice remove last 9-byte segment from bytes and return as int72
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int72 derived from bytes
     */
    function popInt72(Bytes32.Builder memory self) internal pure returns (int72 element) {
        unchecked {
            self._size -= 72;
            bytes32 elementBytes = (self._data >> self._size) & MASK_09;
            element = int72(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_09 << self._size);
        }
    }

    /**
     * @notice remove first 9-byte segment from bytes and return as int72
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int72 derived from bytes
     */
    function shiftInt72(Bytes32.Builder memory self) internal pure returns (int72 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_09;
            element = int72(Bytes32.toInt256(elementBytes));
            self._data >>= 72;
            self._size -= 72;
        }
    }

    /**
     * @notice insert int72 value to 9-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int72 to add
     */
    function unshiftInt72(Bytes32.Builder memory self, int72 element) internal pure {
        unchecked {
            self._data = (self._data << 72) | (Int256.toBytes32(element) & (~bytes32(0) >> 184));
            self._size += 72;
        }
    }
    /**
     * @notice parse uint72 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint72 derived from bytes
     */
    function parseUint72(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint72 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_09;
        element = uint72(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint72 value to 9-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint72 to insert
     * @param offset slot offset in bits
     */
    function insertUint72(Bytes32.Builder memory self, uint72 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_09 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 72 + offset) self._size = 72 + offset;
        }
    }

    /**
     * @notice insert uint72 value to 9-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint72 to add
     */
    function pushUint72(Bytes32.Builder memory self, uint72 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 72;
        }
    }

    /**
     * @notice remove last 9-byte segment from bytes and return as uint72
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint72 derived from bytes
     */
    function popUint72(Bytes32.Builder memory self) internal pure returns (uint72 element) {
        unchecked {
            self._size -= 72;
            bytes32 elementBytes = (self._data >> self._size) & MASK_09;
            element = uint72(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_09 << self._size);
        }
    }

    /**
     * @notice remove first 9-byte segment from bytes and return as uint72
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint72 derived from bytes
     */
    function shiftUint72(Bytes32.Builder memory self) internal pure returns (uint72 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_09;
            element = uint72(Bytes32.toUint256(elementBytes));
            self._data >>= 72;
            self._size -= 72;
        }
    }

    /**
     * @notice insert uint72 value to 9-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint72 to add
     */
    function unshiftUint72(Bytes32.Builder memory self, uint72 element) internal pure {
        unchecked {
            self._data = (self._data << 72) | Uint256.toBytes32(element);
            self._size += 72;
        }
    }
    /**
     * @notice parse bytes10 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes10 derived from bytes
     */
    function parseBytes10(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes10 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_10;
        element = bytes10(elementBytes << 176);
    }

    /**
     * @notice insert bytes10 value to 10-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes10 to insert
     * @param offset slot offset in bits
     */
    function insertBytes10(Bytes32.Builder memory self, bytes10 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_10 << offset) | (bytes32(element) >> 176 << offset);
            if (self._size < 80 + offset) self._size = 80 + offset;
        }
    }

    /**
     * @notice insert bytes10 value to 10-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes10 to add
     */
    function pushBytes10(Bytes32.Builder memory self, bytes10 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 176 << self._size;
            self._size += 80;
        }
    }

    /**
     * @notice remove last 10-byte segment from bytes and return as bytes10
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes10 derived from bytes
     */
    function popBytes10(Bytes32.Builder memory self) internal pure returns (bytes10 element) {
        unchecked {
            self._size -= 80;
            bytes32 elementBytes = (self._data >> self._size) & MASK_10;
            element = bytes10(elementBytes << 176);
            self._data &= ~(MASK_10 << self._size);
        }
    }

    /**
     * @notice remove first 10-byte segment from bytes and return as bytes10
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes10 derived from bytes
     */
    function shiftBytes10(Bytes32.Builder memory self) internal pure returns (bytes10 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_10;
            element = bytes10(elementBytes << 176);
            self._data >>= 80;
            self._size -= 80;
        }
    }

    /**
     * @notice insert bytes10 value to 10-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes10 to add
     */
    function unshiftBytes10(Bytes32.Builder memory self, bytes10 element) internal pure {
        unchecked {
            self._data = (self._data << 80) | bytes32(element) >> 176;
            self._size += 80;
        }
    }
    /**
     * @notice parse int80 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int80 derived from bytes
     */
    function parseInt80(Bytes32.Builder memory self, uint256 offset) internal pure returns (int80 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_10;
        element = int80(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int80 value to 10-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int80 to insert
     * @param offset slot offset in bits
     */
    function insertInt80(Bytes32.Builder memory self, int80 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_10 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 176)) << offset);
            if (self._size < 80 + offset) self._size = 80 + offset;
        }
    }

    /**
     * @notice insert int80 value to 10-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int80 to add
     */
    function pushInt80(Bytes32.Builder memory self, int80 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 176)) << self._size;
            self._size += 80;
        }
    }

    /**
     * @notice remove last 10-byte segment from bytes and return as int80
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int80 derived from bytes
     */
    function popInt80(Bytes32.Builder memory self) internal pure returns (int80 element) {
        unchecked {
            self._size -= 80;
            bytes32 elementBytes = (self._data >> self._size) & MASK_10;
            element = int80(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_10 << self._size);
        }
    }

    /**
     * @notice remove first 10-byte segment from bytes and return as int80
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int80 derived from bytes
     */
    function shiftInt80(Bytes32.Builder memory self) internal pure returns (int80 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_10;
            element = int80(Bytes32.toInt256(elementBytes));
            self._data >>= 80;
            self._size -= 80;
        }
    }

    /**
     * @notice insert int80 value to 10-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int80 to add
     */
    function unshiftInt80(Bytes32.Builder memory self, int80 element) internal pure {
        unchecked {
            self._data = (self._data << 80) | (Int256.toBytes32(element) & (~bytes32(0) >> 176));
            self._size += 80;
        }
    }
    /**
     * @notice parse uint80 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint80 derived from bytes
     */
    function parseUint80(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint80 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_10;
        element = uint80(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint80 value to 10-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint80 to insert
     * @param offset slot offset in bits
     */
    function insertUint80(Bytes32.Builder memory self, uint80 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_10 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 80 + offset) self._size = 80 + offset;
        }
    }

    /**
     * @notice insert uint80 value to 10-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint80 to add
     */
    function pushUint80(Bytes32.Builder memory self, uint80 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 80;
        }
    }

    /**
     * @notice remove last 10-byte segment from bytes and return as uint80
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint80 derived from bytes
     */
    function popUint80(Bytes32.Builder memory self) internal pure returns (uint80 element) {
        unchecked {
            self._size -= 80;
            bytes32 elementBytes = (self._data >> self._size) & MASK_10;
            element = uint80(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_10 << self._size);
        }
    }

    /**
     * @notice remove first 10-byte segment from bytes and return as uint80
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint80 derived from bytes
     */
    function shiftUint80(Bytes32.Builder memory self) internal pure returns (uint80 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_10;
            element = uint80(Bytes32.toUint256(elementBytes));
            self._data >>= 80;
            self._size -= 80;
        }
    }

    /**
     * @notice insert uint80 value to 10-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint80 to add
     */
    function unshiftUint80(Bytes32.Builder memory self, uint80 element) internal pure {
        unchecked {
            self._data = (self._data << 80) | Uint256.toBytes32(element);
            self._size += 80;
        }
    }
    /**
     * @notice parse bytes11 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes11 derived from bytes
     */
    function parseBytes11(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes11 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_11;
        element = bytes11(elementBytes << 168);
    }

    /**
     * @notice insert bytes11 value to 11-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes11 to insert
     * @param offset slot offset in bits
     */
    function insertBytes11(Bytes32.Builder memory self, bytes11 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_11 << offset) | (bytes32(element) >> 168 << offset);
            if (self._size < 88 + offset) self._size = 88 + offset;
        }
    }

    /**
     * @notice insert bytes11 value to 11-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes11 to add
     */
    function pushBytes11(Bytes32.Builder memory self, bytes11 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 168 << self._size;
            self._size += 88;
        }
    }

    /**
     * @notice remove last 11-byte segment from bytes and return as bytes11
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes11 derived from bytes
     */
    function popBytes11(Bytes32.Builder memory self) internal pure returns (bytes11 element) {
        unchecked {
            self._size -= 88;
            bytes32 elementBytes = (self._data >> self._size) & MASK_11;
            element = bytes11(elementBytes << 168);
            self._data &= ~(MASK_11 << self._size);
        }
    }

    /**
     * @notice remove first 11-byte segment from bytes and return as bytes11
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes11 derived from bytes
     */
    function shiftBytes11(Bytes32.Builder memory self) internal pure returns (bytes11 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_11;
            element = bytes11(elementBytes << 168);
            self._data >>= 88;
            self._size -= 88;
        }
    }

    /**
     * @notice insert bytes11 value to 11-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes11 to add
     */
    function unshiftBytes11(Bytes32.Builder memory self, bytes11 element) internal pure {
        unchecked {
            self._data = (self._data << 88) | bytes32(element) >> 168;
            self._size += 88;
        }
    }
    /**
     * @notice parse int88 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int88 derived from bytes
     */
    function parseInt88(Bytes32.Builder memory self, uint256 offset) internal pure returns (int88 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_11;
        element = int88(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int88 value to 11-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int88 to insert
     * @param offset slot offset in bits
     */
    function insertInt88(Bytes32.Builder memory self, int88 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_11 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 168)) << offset);
            if (self._size < 88 + offset) self._size = 88 + offset;
        }
    }

    /**
     * @notice insert int88 value to 11-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int88 to add
     */
    function pushInt88(Bytes32.Builder memory self, int88 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 168)) << self._size;
            self._size += 88;
        }
    }

    /**
     * @notice remove last 11-byte segment from bytes and return as int88
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int88 derived from bytes
     */
    function popInt88(Bytes32.Builder memory self) internal pure returns (int88 element) {
        unchecked {
            self._size -= 88;
            bytes32 elementBytes = (self._data >> self._size) & MASK_11;
            element = int88(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_11 << self._size);
        }
    }

    /**
     * @notice remove first 11-byte segment from bytes and return as int88
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int88 derived from bytes
     */
    function shiftInt88(Bytes32.Builder memory self) internal pure returns (int88 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_11;
            element = int88(Bytes32.toInt256(elementBytes));
            self._data >>= 88;
            self._size -= 88;
        }
    }

    /**
     * @notice insert int88 value to 11-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int88 to add
     */
    function unshiftInt88(Bytes32.Builder memory self, int88 element) internal pure {
        unchecked {
            self._data = (self._data << 88) | (Int256.toBytes32(element) & (~bytes32(0) >> 168));
            self._size += 88;
        }
    }
    /**
     * @notice parse uint88 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint88 derived from bytes
     */
    function parseUint88(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint88 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_11;
        element = uint88(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint88 value to 11-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint88 to insert
     * @param offset slot offset in bits
     */
    function insertUint88(Bytes32.Builder memory self, uint88 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_11 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 88 + offset) self._size = 88 + offset;
        }
    }

    /**
     * @notice insert uint88 value to 11-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint88 to add
     */
    function pushUint88(Bytes32.Builder memory self, uint88 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 88;
        }
    }

    /**
     * @notice remove last 11-byte segment from bytes and return as uint88
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint88 derived from bytes
     */
    function popUint88(Bytes32.Builder memory self) internal pure returns (uint88 element) {
        unchecked {
            self._size -= 88;
            bytes32 elementBytes = (self._data >> self._size) & MASK_11;
            element = uint88(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_11 << self._size);
        }
    }

    /**
     * @notice remove first 11-byte segment from bytes and return as uint88
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint88 derived from bytes
     */
    function shiftUint88(Bytes32.Builder memory self) internal pure returns (uint88 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_11;
            element = uint88(Bytes32.toUint256(elementBytes));
            self._data >>= 88;
            self._size -= 88;
        }
    }

    /**
     * @notice insert uint88 value to 11-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint88 to add
     */
    function unshiftUint88(Bytes32.Builder memory self, uint88 element) internal pure {
        unchecked {
            self._data = (self._data << 88) | Uint256.toBytes32(element);
            self._size += 88;
        }
    }
    /**
     * @notice parse bytes12 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes12 derived from bytes
     */
    function parseBytes12(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes12 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_12;
        element = bytes12(elementBytes << 160);
    }

    /**
     * @notice insert bytes12 value to 12-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes12 to insert
     * @param offset slot offset in bits
     */
    function insertBytes12(Bytes32.Builder memory self, bytes12 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_12 << offset) | (bytes32(element) >> 160 << offset);
            if (self._size < 96 + offset) self._size = 96 + offset;
        }
    }

    /**
     * @notice insert bytes12 value to 12-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes12 to add
     */
    function pushBytes12(Bytes32.Builder memory self, bytes12 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 160 << self._size;
            self._size += 96;
        }
    }

    /**
     * @notice remove last 12-byte segment from bytes and return as bytes12
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes12 derived from bytes
     */
    function popBytes12(Bytes32.Builder memory self) internal pure returns (bytes12 element) {
        unchecked {
            self._size -= 96;
            bytes32 elementBytes = (self._data >> self._size) & MASK_12;
            element = bytes12(elementBytes << 160);
            self._data &= ~(MASK_12 << self._size);
        }
    }

    /**
     * @notice remove first 12-byte segment from bytes and return as bytes12
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes12 derived from bytes
     */
    function shiftBytes12(Bytes32.Builder memory self) internal pure returns (bytes12 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_12;
            element = bytes12(elementBytes << 160);
            self._data >>= 96;
            self._size -= 96;
        }
    }

    /**
     * @notice insert bytes12 value to 12-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes12 to add
     */
    function unshiftBytes12(Bytes32.Builder memory self, bytes12 element) internal pure {
        unchecked {
            self._data = (self._data << 96) | bytes32(element) >> 160;
            self._size += 96;
        }
    }
    /**
     * @notice parse int96 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int96 derived from bytes
     */
    function parseInt96(Bytes32.Builder memory self, uint256 offset) internal pure returns (int96 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_12;
        element = int96(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int96 value to 12-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int96 to insert
     * @param offset slot offset in bits
     */
    function insertInt96(Bytes32.Builder memory self, int96 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_12 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 160)) << offset);
            if (self._size < 96 + offset) self._size = 96 + offset;
        }
    }

    /**
     * @notice insert int96 value to 12-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int96 to add
     */
    function pushInt96(Bytes32.Builder memory self, int96 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 160)) << self._size;
            self._size += 96;
        }
    }

    /**
     * @notice remove last 12-byte segment from bytes and return as int96
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int96 derived from bytes
     */
    function popInt96(Bytes32.Builder memory self) internal pure returns (int96 element) {
        unchecked {
            self._size -= 96;
            bytes32 elementBytes = (self._data >> self._size) & MASK_12;
            element = int96(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_12 << self._size);
        }
    }

    /**
     * @notice remove first 12-byte segment from bytes and return as int96
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int96 derived from bytes
     */
    function shiftInt96(Bytes32.Builder memory self) internal pure returns (int96 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_12;
            element = int96(Bytes32.toInt256(elementBytes));
            self._data >>= 96;
            self._size -= 96;
        }
    }

    /**
     * @notice insert int96 value to 12-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int96 to add
     */
    function unshiftInt96(Bytes32.Builder memory self, int96 element) internal pure {
        unchecked {
            self._data = (self._data << 96) | (Int256.toBytes32(element) & (~bytes32(0) >> 160));
            self._size += 96;
        }
    }
    /**
     * @notice parse uint96 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint96 derived from bytes
     */
    function parseUint96(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint96 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_12;
        element = uint96(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint96 value to 12-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint96 to insert
     * @param offset slot offset in bits
     */
    function insertUint96(Bytes32.Builder memory self, uint96 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_12 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 96 + offset) self._size = 96 + offset;
        }
    }

    /**
     * @notice insert uint96 value to 12-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint96 to add
     */
    function pushUint96(Bytes32.Builder memory self, uint96 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 96;
        }
    }

    /**
     * @notice remove last 12-byte segment from bytes and return as uint96
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint96 derived from bytes
     */
    function popUint96(Bytes32.Builder memory self) internal pure returns (uint96 element) {
        unchecked {
            self._size -= 96;
            bytes32 elementBytes = (self._data >> self._size) & MASK_12;
            element = uint96(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_12 << self._size);
        }
    }

    /**
     * @notice remove first 12-byte segment from bytes and return as uint96
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint96 derived from bytes
     */
    function shiftUint96(Bytes32.Builder memory self) internal pure returns (uint96 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_12;
            element = uint96(Bytes32.toUint256(elementBytes));
            self._data >>= 96;
            self._size -= 96;
        }
    }

    /**
     * @notice insert uint96 value to 12-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint96 to add
     */
    function unshiftUint96(Bytes32.Builder memory self, uint96 element) internal pure {
        unchecked {
            self._data = (self._data << 96) | Uint256.toBytes32(element);
            self._size += 96;
        }
    }
    /**
     * @notice parse bytes13 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes13 derived from bytes
     */
    function parseBytes13(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes13 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_13;
        element = bytes13(elementBytes << 152);
    }

    /**
     * @notice insert bytes13 value to 13-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes13 to insert
     * @param offset slot offset in bits
     */
    function insertBytes13(Bytes32.Builder memory self, bytes13 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_13 << offset) | (bytes32(element) >> 152 << offset);
            if (self._size < 104 + offset) self._size = 104 + offset;
        }
    }

    /**
     * @notice insert bytes13 value to 13-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes13 to add
     */
    function pushBytes13(Bytes32.Builder memory self, bytes13 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 152 << self._size;
            self._size += 104;
        }
    }

    /**
     * @notice remove last 13-byte segment from bytes and return as bytes13
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes13 derived from bytes
     */
    function popBytes13(Bytes32.Builder memory self) internal pure returns (bytes13 element) {
        unchecked {
            self._size -= 104;
            bytes32 elementBytes = (self._data >> self._size) & MASK_13;
            element = bytes13(elementBytes << 152);
            self._data &= ~(MASK_13 << self._size);
        }
    }

    /**
     * @notice remove first 13-byte segment from bytes and return as bytes13
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes13 derived from bytes
     */
    function shiftBytes13(Bytes32.Builder memory self) internal pure returns (bytes13 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_13;
            element = bytes13(elementBytes << 152);
            self._data >>= 104;
            self._size -= 104;
        }
    }

    /**
     * @notice insert bytes13 value to 13-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes13 to add
     */
    function unshiftBytes13(Bytes32.Builder memory self, bytes13 element) internal pure {
        unchecked {
            self._data = (self._data << 104) | bytes32(element) >> 152;
            self._size += 104;
        }
    }
    /**
     * @notice parse int104 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int104 derived from bytes
     */
    function parseInt104(Bytes32.Builder memory self, uint256 offset) internal pure returns (int104 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_13;
        element = int104(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int104 value to 13-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int104 to insert
     * @param offset slot offset in bits
     */
    function insertInt104(Bytes32.Builder memory self, int104 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_13 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 152)) << offset);
            if (self._size < 104 + offset) self._size = 104 + offset;
        }
    }

    /**
     * @notice insert int104 value to 13-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int104 to add
     */
    function pushInt104(Bytes32.Builder memory self, int104 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 152)) << self._size;
            self._size += 104;
        }
    }

    /**
     * @notice remove last 13-byte segment from bytes and return as int104
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int104 derived from bytes
     */
    function popInt104(Bytes32.Builder memory self) internal pure returns (int104 element) {
        unchecked {
            self._size -= 104;
            bytes32 elementBytes = (self._data >> self._size) & MASK_13;
            element = int104(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_13 << self._size);
        }
    }

    /**
     * @notice remove first 13-byte segment from bytes and return as int104
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int104 derived from bytes
     */
    function shiftInt104(Bytes32.Builder memory self) internal pure returns (int104 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_13;
            element = int104(Bytes32.toInt256(elementBytes));
            self._data >>= 104;
            self._size -= 104;
        }
    }

    /**
     * @notice insert int104 value to 13-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int104 to add
     */
    function unshiftInt104(Bytes32.Builder memory self, int104 element) internal pure {
        unchecked {
            self._data = (self._data << 104) | (Int256.toBytes32(element) & (~bytes32(0) >> 152));
            self._size += 104;
        }
    }
    /**
     * @notice parse uint104 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint104 derived from bytes
     */
    function parseUint104(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint104 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_13;
        element = uint104(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint104 value to 13-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint104 to insert
     * @param offset slot offset in bits
     */
    function insertUint104(Bytes32.Builder memory self, uint104 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_13 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 104 + offset) self._size = 104 + offset;
        }
    }

    /**
     * @notice insert uint104 value to 13-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint104 to add
     */
    function pushUint104(Bytes32.Builder memory self, uint104 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 104;
        }
    }

    /**
     * @notice remove last 13-byte segment from bytes and return as uint104
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint104 derived from bytes
     */
    function popUint104(Bytes32.Builder memory self) internal pure returns (uint104 element) {
        unchecked {
            self._size -= 104;
            bytes32 elementBytes = (self._data >> self._size) & MASK_13;
            element = uint104(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_13 << self._size);
        }
    }

    /**
     * @notice remove first 13-byte segment from bytes and return as uint104
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint104 derived from bytes
     */
    function shiftUint104(Bytes32.Builder memory self) internal pure returns (uint104 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_13;
            element = uint104(Bytes32.toUint256(elementBytes));
            self._data >>= 104;
            self._size -= 104;
        }
    }

    /**
     * @notice insert uint104 value to 13-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint104 to add
     */
    function unshiftUint104(Bytes32.Builder memory self, uint104 element) internal pure {
        unchecked {
            self._data = (self._data << 104) | Uint256.toBytes32(element);
            self._size += 104;
        }
    }
    /**
     * @notice parse bytes14 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes14 derived from bytes
     */
    function parseBytes14(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes14 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_14;
        element = bytes14(elementBytes << 144);
    }

    /**
     * @notice insert bytes14 value to 14-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes14 to insert
     * @param offset slot offset in bits
     */
    function insertBytes14(Bytes32.Builder memory self, bytes14 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_14 << offset) | (bytes32(element) >> 144 << offset);
            if (self._size < 112 + offset) self._size = 112 + offset;
        }
    }

    /**
     * @notice insert bytes14 value to 14-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes14 to add
     */
    function pushBytes14(Bytes32.Builder memory self, bytes14 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 144 << self._size;
            self._size += 112;
        }
    }

    /**
     * @notice remove last 14-byte segment from bytes and return as bytes14
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes14 derived from bytes
     */
    function popBytes14(Bytes32.Builder memory self) internal pure returns (bytes14 element) {
        unchecked {
            self._size -= 112;
            bytes32 elementBytes = (self._data >> self._size) & MASK_14;
            element = bytes14(elementBytes << 144);
            self._data &= ~(MASK_14 << self._size);
        }
    }

    /**
     * @notice remove first 14-byte segment from bytes and return as bytes14
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes14 derived from bytes
     */
    function shiftBytes14(Bytes32.Builder memory self) internal pure returns (bytes14 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_14;
            element = bytes14(elementBytes << 144);
            self._data >>= 112;
            self._size -= 112;
        }
    }

    /**
     * @notice insert bytes14 value to 14-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes14 to add
     */
    function unshiftBytes14(Bytes32.Builder memory self, bytes14 element) internal pure {
        unchecked {
            self._data = (self._data << 112) | bytes32(element) >> 144;
            self._size += 112;
        }
    }
    /**
     * @notice parse int112 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int112 derived from bytes
     */
    function parseInt112(Bytes32.Builder memory self, uint256 offset) internal pure returns (int112 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_14;
        element = int112(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int112 value to 14-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int112 to insert
     * @param offset slot offset in bits
     */
    function insertInt112(Bytes32.Builder memory self, int112 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_14 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 144)) << offset);
            if (self._size < 112 + offset) self._size = 112 + offset;
        }
    }

    /**
     * @notice insert int112 value to 14-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int112 to add
     */
    function pushInt112(Bytes32.Builder memory self, int112 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 144)) << self._size;
            self._size += 112;
        }
    }

    /**
     * @notice remove last 14-byte segment from bytes and return as int112
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int112 derived from bytes
     */
    function popInt112(Bytes32.Builder memory self) internal pure returns (int112 element) {
        unchecked {
            self._size -= 112;
            bytes32 elementBytes = (self._data >> self._size) & MASK_14;
            element = int112(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_14 << self._size);
        }
    }

    /**
     * @notice remove first 14-byte segment from bytes and return as int112
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int112 derived from bytes
     */
    function shiftInt112(Bytes32.Builder memory self) internal pure returns (int112 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_14;
            element = int112(Bytes32.toInt256(elementBytes));
            self._data >>= 112;
            self._size -= 112;
        }
    }

    /**
     * @notice insert int112 value to 14-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int112 to add
     */
    function unshiftInt112(Bytes32.Builder memory self, int112 element) internal pure {
        unchecked {
            self._data = (self._data << 112) | (Int256.toBytes32(element) & (~bytes32(0) >> 144));
            self._size += 112;
        }
    }
    /**
     * @notice parse uint112 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint112 derived from bytes
     */
    function parseUint112(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint112 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_14;
        element = uint112(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint112 value to 14-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint112 to insert
     * @param offset slot offset in bits
     */
    function insertUint112(Bytes32.Builder memory self, uint112 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_14 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 112 + offset) self._size = 112 + offset;
        }
    }

    /**
     * @notice insert uint112 value to 14-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint112 to add
     */
    function pushUint112(Bytes32.Builder memory self, uint112 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 112;
        }
    }

    /**
     * @notice remove last 14-byte segment from bytes and return as uint112
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint112 derived from bytes
     */
    function popUint112(Bytes32.Builder memory self) internal pure returns (uint112 element) {
        unchecked {
            self._size -= 112;
            bytes32 elementBytes = (self._data >> self._size) & MASK_14;
            element = uint112(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_14 << self._size);
        }
    }

    /**
     * @notice remove first 14-byte segment from bytes and return as uint112
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint112 derived from bytes
     */
    function shiftUint112(Bytes32.Builder memory self) internal pure returns (uint112 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_14;
            element = uint112(Bytes32.toUint256(elementBytes));
            self._data >>= 112;
            self._size -= 112;
        }
    }

    /**
     * @notice insert uint112 value to 14-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint112 to add
     */
    function unshiftUint112(Bytes32.Builder memory self, uint112 element) internal pure {
        unchecked {
            self._data = (self._data << 112) | Uint256.toBytes32(element);
            self._size += 112;
        }
    }
    /**
     * @notice parse bytes15 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes15 derived from bytes
     */
    function parseBytes15(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes15 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_15;
        element = bytes15(elementBytes << 136);
    }

    /**
     * @notice insert bytes15 value to 15-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes15 to insert
     * @param offset slot offset in bits
     */
    function insertBytes15(Bytes32.Builder memory self, bytes15 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_15 << offset) | (bytes32(element) >> 136 << offset);
            if (self._size < 120 + offset) self._size = 120 + offset;
        }
    }

    /**
     * @notice insert bytes15 value to 15-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes15 to add
     */
    function pushBytes15(Bytes32.Builder memory self, bytes15 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 136 << self._size;
            self._size += 120;
        }
    }

    /**
     * @notice remove last 15-byte segment from bytes and return as bytes15
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes15 derived from bytes
     */
    function popBytes15(Bytes32.Builder memory self) internal pure returns (bytes15 element) {
        unchecked {
            self._size -= 120;
            bytes32 elementBytes = (self._data >> self._size) & MASK_15;
            element = bytes15(elementBytes << 136);
            self._data &= ~(MASK_15 << self._size);
        }
    }

    /**
     * @notice remove first 15-byte segment from bytes and return as bytes15
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes15 derived from bytes
     */
    function shiftBytes15(Bytes32.Builder memory self) internal pure returns (bytes15 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_15;
            element = bytes15(elementBytes << 136);
            self._data >>= 120;
            self._size -= 120;
        }
    }

    /**
     * @notice insert bytes15 value to 15-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes15 to add
     */
    function unshiftBytes15(Bytes32.Builder memory self, bytes15 element) internal pure {
        unchecked {
            self._data = (self._data << 120) | bytes32(element) >> 136;
            self._size += 120;
        }
    }
    /**
     * @notice parse int120 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int120 derived from bytes
     */
    function parseInt120(Bytes32.Builder memory self, uint256 offset) internal pure returns (int120 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_15;
        element = int120(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int120 value to 15-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int120 to insert
     * @param offset slot offset in bits
     */
    function insertInt120(Bytes32.Builder memory self, int120 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_15 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 136)) << offset);
            if (self._size < 120 + offset) self._size = 120 + offset;
        }
    }

    /**
     * @notice insert int120 value to 15-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int120 to add
     */
    function pushInt120(Bytes32.Builder memory self, int120 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 136)) << self._size;
            self._size += 120;
        }
    }

    /**
     * @notice remove last 15-byte segment from bytes and return as int120
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int120 derived from bytes
     */
    function popInt120(Bytes32.Builder memory self) internal pure returns (int120 element) {
        unchecked {
            self._size -= 120;
            bytes32 elementBytes = (self._data >> self._size) & MASK_15;
            element = int120(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_15 << self._size);
        }
    }

    /**
     * @notice remove first 15-byte segment from bytes and return as int120
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int120 derived from bytes
     */
    function shiftInt120(Bytes32.Builder memory self) internal pure returns (int120 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_15;
            element = int120(Bytes32.toInt256(elementBytes));
            self._data >>= 120;
            self._size -= 120;
        }
    }

    /**
     * @notice insert int120 value to 15-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int120 to add
     */
    function unshiftInt120(Bytes32.Builder memory self, int120 element) internal pure {
        unchecked {
            self._data = (self._data << 120) | (Int256.toBytes32(element) & (~bytes32(0) >> 136));
            self._size += 120;
        }
    }
    /**
     * @notice parse uint120 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint120 derived from bytes
     */
    function parseUint120(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint120 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_15;
        element = uint120(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint120 value to 15-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint120 to insert
     * @param offset slot offset in bits
     */
    function insertUint120(Bytes32.Builder memory self, uint120 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_15 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 120 + offset) self._size = 120 + offset;
        }
    }

    /**
     * @notice insert uint120 value to 15-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint120 to add
     */
    function pushUint120(Bytes32.Builder memory self, uint120 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 120;
        }
    }

    /**
     * @notice remove last 15-byte segment from bytes and return as uint120
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint120 derived from bytes
     */
    function popUint120(Bytes32.Builder memory self) internal pure returns (uint120 element) {
        unchecked {
            self._size -= 120;
            bytes32 elementBytes = (self._data >> self._size) & MASK_15;
            element = uint120(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_15 << self._size);
        }
    }

    /**
     * @notice remove first 15-byte segment from bytes and return as uint120
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint120 derived from bytes
     */
    function shiftUint120(Bytes32.Builder memory self) internal pure returns (uint120 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_15;
            element = uint120(Bytes32.toUint256(elementBytes));
            self._data >>= 120;
            self._size -= 120;
        }
    }

    /**
     * @notice insert uint120 value to 15-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint120 to add
     */
    function unshiftUint120(Bytes32.Builder memory self, uint120 element) internal pure {
        unchecked {
            self._data = (self._data << 120) | Uint256.toBytes32(element);
            self._size += 120;
        }
    }
    /**
     * @notice parse bytes16 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes16 derived from bytes
     */
    function parseBytes16(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes16 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_16;
        element = bytes16(elementBytes << 128);
    }

    /**
     * @notice insert bytes16 value to 16-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes16 to insert
     * @param offset slot offset in bits
     */
    function insertBytes16(Bytes32.Builder memory self, bytes16 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_16 << offset) | (bytes32(element) >> 128 << offset);
            if (self._size < 128 + offset) self._size = 128 + offset;
        }
    }

    /**
     * @notice insert bytes16 value to 16-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes16 to add
     */
    function pushBytes16(Bytes32.Builder memory self, bytes16 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 128 << self._size;
            self._size += 128;
        }
    }

    /**
     * @notice remove last 16-byte segment from bytes and return as bytes16
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes16 derived from bytes
     */
    function popBytes16(Bytes32.Builder memory self) internal pure returns (bytes16 element) {
        unchecked {
            self._size -= 128;
            bytes32 elementBytes = (self._data >> self._size) & MASK_16;
            element = bytes16(elementBytes << 128);
            self._data &= ~(MASK_16 << self._size);
        }
    }

    /**
     * @notice remove first 16-byte segment from bytes and return as bytes16
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes16 derived from bytes
     */
    function shiftBytes16(Bytes32.Builder memory self) internal pure returns (bytes16 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_16;
            element = bytes16(elementBytes << 128);
            self._data >>= 128;
            self._size -= 128;
        }
    }

    /**
     * @notice insert bytes16 value to 16-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes16 to add
     */
    function unshiftBytes16(Bytes32.Builder memory self, bytes16 element) internal pure {
        unchecked {
            self._data = (self._data << 128) | bytes32(element) >> 128;
            self._size += 128;
        }
    }
    /**
     * @notice parse int128 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int128 derived from bytes
     */
    function parseInt128(Bytes32.Builder memory self, uint256 offset) internal pure returns (int128 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_16;
        element = int128(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int128 value to 16-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int128 to insert
     * @param offset slot offset in bits
     */
    function insertInt128(Bytes32.Builder memory self, int128 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_16 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 128)) << offset);
            if (self._size < 128 + offset) self._size = 128 + offset;
        }
    }

    /**
     * @notice insert int128 value to 16-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int128 to add
     */
    function pushInt128(Bytes32.Builder memory self, int128 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 128)) << self._size;
            self._size += 128;
        }
    }

    /**
     * @notice remove last 16-byte segment from bytes and return as int128
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int128 derived from bytes
     */
    function popInt128(Bytes32.Builder memory self) internal pure returns (int128 element) {
        unchecked {
            self._size -= 128;
            bytes32 elementBytes = (self._data >> self._size) & MASK_16;
            element = int128(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_16 << self._size);
        }
    }

    /**
     * @notice remove first 16-byte segment from bytes and return as int128
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int128 derived from bytes
     */
    function shiftInt128(Bytes32.Builder memory self) internal pure returns (int128 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_16;
            element = int128(Bytes32.toInt256(elementBytes));
            self._data >>= 128;
            self._size -= 128;
        }
    }

    /**
     * @notice insert int128 value to 16-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int128 to add
     */
    function unshiftInt128(Bytes32.Builder memory self, int128 element) internal pure {
        unchecked {
            self._data = (self._data << 128) | (Int256.toBytes32(element) & (~bytes32(0) >> 128));
            self._size += 128;
        }
    }
    /**
     * @notice parse uint128 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint128 derived from bytes
     */
    function parseUint128(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint128 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_16;
        element = uint128(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint128 value to 16-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint128 to insert
     * @param offset slot offset in bits
     */
    function insertUint128(Bytes32.Builder memory self, uint128 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_16 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 128 + offset) self._size = 128 + offset;
        }
    }

    /**
     * @notice insert uint128 value to 16-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint128 to add
     */
    function pushUint128(Bytes32.Builder memory self, uint128 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 128;
        }
    }

    /**
     * @notice remove last 16-byte segment from bytes and return as uint128
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint128 derived from bytes
     */
    function popUint128(Bytes32.Builder memory self) internal pure returns (uint128 element) {
        unchecked {
            self._size -= 128;
            bytes32 elementBytes = (self._data >> self._size) & MASK_16;
            element = uint128(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_16 << self._size);
        }
    }

    /**
     * @notice remove first 16-byte segment from bytes and return as uint128
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint128 derived from bytes
     */
    function shiftUint128(Bytes32.Builder memory self) internal pure returns (uint128 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_16;
            element = uint128(Bytes32.toUint256(elementBytes));
            self._data >>= 128;
            self._size -= 128;
        }
    }

    /**
     * @notice insert uint128 value to 16-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint128 to add
     */
    function unshiftUint128(Bytes32.Builder memory self, uint128 element) internal pure {
        unchecked {
            self._data = (self._data << 128) | Uint256.toBytes32(element);
            self._size += 128;
        }
    }
    /**
     * @notice parse bytes17 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes17 derived from bytes
     */
    function parseBytes17(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes17 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_17;
        element = bytes17(elementBytes << 120);
    }

    /**
     * @notice insert bytes17 value to 17-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes17 to insert
     * @param offset slot offset in bits
     */
    function insertBytes17(Bytes32.Builder memory self, bytes17 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_17 << offset) | (bytes32(element) >> 120 << offset);
            if (self._size < 136 + offset) self._size = 136 + offset;
        }
    }

    /**
     * @notice insert bytes17 value to 17-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes17 to add
     */
    function pushBytes17(Bytes32.Builder memory self, bytes17 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 120 << self._size;
            self._size += 136;
        }
    }

    /**
     * @notice remove last 17-byte segment from bytes and return as bytes17
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes17 derived from bytes
     */
    function popBytes17(Bytes32.Builder memory self) internal pure returns (bytes17 element) {
        unchecked {
            self._size -= 136;
            bytes32 elementBytes = (self._data >> self._size) & MASK_17;
            element = bytes17(elementBytes << 120);
            self._data &= ~(MASK_17 << self._size);
        }
    }

    /**
     * @notice remove first 17-byte segment from bytes and return as bytes17
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes17 derived from bytes
     */
    function shiftBytes17(Bytes32.Builder memory self) internal pure returns (bytes17 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_17;
            element = bytes17(elementBytes << 120);
            self._data >>= 136;
            self._size -= 136;
        }
    }

    /**
     * @notice insert bytes17 value to 17-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes17 to add
     */
    function unshiftBytes17(Bytes32.Builder memory self, bytes17 element) internal pure {
        unchecked {
            self._data = (self._data << 136) | bytes32(element) >> 120;
            self._size += 136;
        }
    }
    /**
     * @notice parse int136 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int136 derived from bytes
     */
    function parseInt136(Bytes32.Builder memory self, uint256 offset) internal pure returns (int136 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_17;
        element = int136(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int136 value to 17-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int136 to insert
     * @param offset slot offset in bits
     */
    function insertInt136(Bytes32.Builder memory self, int136 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_17 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 120)) << offset);
            if (self._size < 136 + offset) self._size = 136 + offset;
        }
    }

    /**
     * @notice insert int136 value to 17-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int136 to add
     */
    function pushInt136(Bytes32.Builder memory self, int136 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 120)) << self._size;
            self._size += 136;
        }
    }

    /**
     * @notice remove last 17-byte segment from bytes and return as int136
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int136 derived from bytes
     */
    function popInt136(Bytes32.Builder memory self) internal pure returns (int136 element) {
        unchecked {
            self._size -= 136;
            bytes32 elementBytes = (self._data >> self._size) & MASK_17;
            element = int136(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_17 << self._size);
        }
    }

    /**
     * @notice remove first 17-byte segment from bytes and return as int136
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int136 derived from bytes
     */
    function shiftInt136(Bytes32.Builder memory self) internal pure returns (int136 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_17;
            element = int136(Bytes32.toInt256(elementBytes));
            self._data >>= 136;
            self._size -= 136;
        }
    }

    /**
     * @notice insert int136 value to 17-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int136 to add
     */
    function unshiftInt136(Bytes32.Builder memory self, int136 element) internal pure {
        unchecked {
            self._data = (self._data << 136) | (Int256.toBytes32(element) & (~bytes32(0) >> 120));
            self._size += 136;
        }
    }
    /**
     * @notice parse uint136 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint136 derived from bytes
     */
    function parseUint136(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint136 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_17;
        element = uint136(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint136 value to 17-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint136 to insert
     * @param offset slot offset in bits
     */
    function insertUint136(Bytes32.Builder memory self, uint136 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_17 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 136 + offset) self._size = 136 + offset;
        }
    }

    /**
     * @notice insert uint136 value to 17-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint136 to add
     */
    function pushUint136(Bytes32.Builder memory self, uint136 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 136;
        }
    }

    /**
     * @notice remove last 17-byte segment from bytes and return as uint136
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint136 derived from bytes
     */
    function popUint136(Bytes32.Builder memory self) internal pure returns (uint136 element) {
        unchecked {
            self._size -= 136;
            bytes32 elementBytes = (self._data >> self._size) & MASK_17;
            element = uint136(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_17 << self._size);
        }
    }

    /**
     * @notice remove first 17-byte segment from bytes and return as uint136
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint136 derived from bytes
     */
    function shiftUint136(Bytes32.Builder memory self) internal pure returns (uint136 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_17;
            element = uint136(Bytes32.toUint256(elementBytes));
            self._data >>= 136;
            self._size -= 136;
        }
    }

    /**
     * @notice insert uint136 value to 17-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint136 to add
     */
    function unshiftUint136(Bytes32.Builder memory self, uint136 element) internal pure {
        unchecked {
            self._data = (self._data << 136) | Uint256.toBytes32(element);
            self._size += 136;
        }
    }
    /**
     * @notice parse bytes18 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes18 derived from bytes
     */
    function parseBytes18(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes18 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_18;
        element = bytes18(elementBytes << 112);
    }

    /**
     * @notice insert bytes18 value to 18-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes18 to insert
     * @param offset slot offset in bits
     */
    function insertBytes18(Bytes32.Builder memory self, bytes18 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_18 << offset) | (bytes32(element) >> 112 << offset);
            if (self._size < 144 + offset) self._size = 144 + offset;
        }
    }

    /**
     * @notice insert bytes18 value to 18-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes18 to add
     */
    function pushBytes18(Bytes32.Builder memory self, bytes18 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 112 << self._size;
            self._size += 144;
        }
    }

    /**
     * @notice remove last 18-byte segment from bytes and return as bytes18
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes18 derived from bytes
     */
    function popBytes18(Bytes32.Builder memory self) internal pure returns (bytes18 element) {
        unchecked {
            self._size -= 144;
            bytes32 elementBytes = (self._data >> self._size) & MASK_18;
            element = bytes18(elementBytes << 112);
            self._data &= ~(MASK_18 << self._size);
        }
    }

    /**
     * @notice remove first 18-byte segment from bytes and return as bytes18
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes18 derived from bytes
     */
    function shiftBytes18(Bytes32.Builder memory self) internal pure returns (bytes18 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_18;
            element = bytes18(elementBytes << 112);
            self._data >>= 144;
            self._size -= 144;
        }
    }

    /**
     * @notice insert bytes18 value to 18-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes18 to add
     */
    function unshiftBytes18(Bytes32.Builder memory self, bytes18 element) internal pure {
        unchecked {
            self._data = (self._data << 144) | bytes32(element) >> 112;
            self._size += 144;
        }
    }
    /**
     * @notice parse int144 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int144 derived from bytes
     */
    function parseInt144(Bytes32.Builder memory self, uint256 offset) internal pure returns (int144 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_18;
        element = int144(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int144 value to 18-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int144 to insert
     * @param offset slot offset in bits
     */
    function insertInt144(Bytes32.Builder memory self, int144 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_18 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 112)) << offset);
            if (self._size < 144 + offset) self._size = 144 + offset;
        }
    }

    /**
     * @notice insert int144 value to 18-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int144 to add
     */
    function pushInt144(Bytes32.Builder memory self, int144 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 112)) << self._size;
            self._size += 144;
        }
    }

    /**
     * @notice remove last 18-byte segment from bytes and return as int144
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int144 derived from bytes
     */
    function popInt144(Bytes32.Builder memory self) internal pure returns (int144 element) {
        unchecked {
            self._size -= 144;
            bytes32 elementBytes = (self._data >> self._size) & MASK_18;
            element = int144(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_18 << self._size);
        }
    }

    /**
     * @notice remove first 18-byte segment from bytes and return as int144
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int144 derived from bytes
     */
    function shiftInt144(Bytes32.Builder memory self) internal pure returns (int144 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_18;
            element = int144(Bytes32.toInt256(elementBytes));
            self._data >>= 144;
            self._size -= 144;
        }
    }

    /**
     * @notice insert int144 value to 18-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int144 to add
     */
    function unshiftInt144(Bytes32.Builder memory self, int144 element) internal pure {
        unchecked {
            self._data = (self._data << 144) | (Int256.toBytes32(element) & (~bytes32(0) >> 112));
            self._size += 144;
        }
    }
    /**
     * @notice parse uint144 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint144 derived from bytes
     */
    function parseUint144(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint144 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_18;
        element = uint144(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint144 value to 18-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint144 to insert
     * @param offset slot offset in bits
     */
    function insertUint144(Bytes32.Builder memory self, uint144 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_18 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 144 + offset) self._size = 144 + offset;
        }
    }

    /**
     * @notice insert uint144 value to 18-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint144 to add
     */
    function pushUint144(Bytes32.Builder memory self, uint144 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 144;
        }
    }

    /**
     * @notice remove last 18-byte segment from bytes and return as uint144
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint144 derived from bytes
     */
    function popUint144(Bytes32.Builder memory self) internal pure returns (uint144 element) {
        unchecked {
            self._size -= 144;
            bytes32 elementBytes = (self._data >> self._size) & MASK_18;
            element = uint144(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_18 << self._size);
        }
    }

    /**
     * @notice remove first 18-byte segment from bytes and return as uint144
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint144 derived from bytes
     */
    function shiftUint144(Bytes32.Builder memory self) internal pure returns (uint144 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_18;
            element = uint144(Bytes32.toUint256(elementBytes));
            self._data >>= 144;
            self._size -= 144;
        }
    }

    /**
     * @notice insert uint144 value to 18-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint144 to add
     */
    function unshiftUint144(Bytes32.Builder memory self, uint144 element) internal pure {
        unchecked {
            self._data = (self._data << 144) | Uint256.toBytes32(element);
            self._size += 144;
        }
    }
    /**
     * @notice parse bytes19 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes19 derived from bytes
     */
    function parseBytes19(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes19 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_19;
        element = bytes19(elementBytes << 104);
    }

    /**
     * @notice insert bytes19 value to 19-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes19 to insert
     * @param offset slot offset in bits
     */
    function insertBytes19(Bytes32.Builder memory self, bytes19 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_19 << offset) | (bytes32(element) >> 104 << offset);
            if (self._size < 152 + offset) self._size = 152 + offset;
        }
    }

    /**
     * @notice insert bytes19 value to 19-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes19 to add
     */
    function pushBytes19(Bytes32.Builder memory self, bytes19 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 104 << self._size;
            self._size += 152;
        }
    }

    /**
     * @notice remove last 19-byte segment from bytes and return as bytes19
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes19 derived from bytes
     */
    function popBytes19(Bytes32.Builder memory self) internal pure returns (bytes19 element) {
        unchecked {
            self._size -= 152;
            bytes32 elementBytes = (self._data >> self._size) & MASK_19;
            element = bytes19(elementBytes << 104);
            self._data &= ~(MASK_19 << self._size);
        }
    }

    /**
     * @notice remove first 19-byte segment from bytes and return as bytes19
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes19 derived from bytes
     */
    function shiftBytes19(Bytes32.Builder memory self) internal pure returns (bytes19 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_19;
            element = bytes19(elementBytes << 104);
            self._data >>= 152;
            self._size -= 152;
        }
    }

    /**
     * @notice insert bytes19 value to 19-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes19 to add
     */
    function unshiftBytes19(Bytes32.Builder memory self, bytes19 element) internal pure {
        unchecked {
            self._data = (self._data << 152) | bytes32(element) >> 104;
            self._size += 152;
        }
    }
    /**
     * @notice parse int152 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int152 derived from bytes
     */
    function parseInt152(Bytes32.Builder memory self, uint256 offset) internal pure returns (int152 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_19;
        element = int152(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int152 value to 19-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int152 to insert
     * @param offset slot offset in bits
     */
    function insertInt152(Bytes32.Builder memory self, int152 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_19 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 104)) << offset);
            if (self._size < 152 + offset) self._size = 152 + offset;
        }
    }

    /**
     * @notice insert int152 value to 19-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int152 to add
     */
    function pushInt152(Bytes32.Builder memory self, int152 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 104)) << self._size;
            self._size += 152;
        }
    }

    /**
     * @notice remove last 19-byte segment from bytes and return as int152
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int152 derived from bytes
     */
    function popInt152(Bytes32.Builder memory self) internal pure returns (int152 element) {
        unchecked {
            self._size -= 152;
            bytes32 elementBytes = (self._data >> self._size) & MASK_19;
            element = int152(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_19 << self._size);
        }
    }

    /**
     * @notice remove first 19-byte segment from bytes and return as int152
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int152 derived from bytes
     */
    function shiftInt152(Bytes32.Builder memory self) internal pure returns (int152 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_19;
            element = int152(Bytes32.toInt256(elementBytes));
            self._data >>= 152;
            self._size -= 152;
        }
    }

    /**
     * @notice insert int152 value to 19-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int152 to add
     */
    function unshiftInt152(Bytes32.Builder memory self, int152 element) internal pure {
        unchecked {
            self._data = (self._data << 152) | (Int256.toBytes32(element) & (~bytes32(0) >> 104));
            self._size += 152;
        }
    }
    /**
     * @notice parse uint152 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint152 derived from bytes
     */
    function parseUint152(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint152 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_19;
        element = uint152(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint152 value to 19-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint152 to insert
     * @param offset slot offset in bits
     */
    function insertUint152(Bytes32.Builder memory self, uint152 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_19 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 152 + offset) self._size = 152 + offset;
        }
    }

    /**
     * @notice insert uint152 value to 19-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint152 to add
     */
    function pushUint152(Bytes32.Builder memory self, uint152 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 152;
        }
    }

    /**
     * @notice remove last 19-byte segment from bytes and return as uint152
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint152 derived from bytes
     */
    function popUint152(Bytes32.Builder memory self) internal pure returns (uint152 element) {
        unchecked {
            self._size -= 152;
            bytes32 elementBytes = (self._data >> self._size) & MASK_19;
            element = uint152(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_19 << self._size);
        }
    }

    /**
     * @notice remove first 19-byte segment from bytes and return as uint152
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint152 derived from bytes
     */
    function shiftUint152(Bytes32.Builder memory self) internal pure returns (uint152 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_19;
            element = uint152(Bytes32.toUint256(elementBytes));
            self._data >>= 152;
            self._size -= 152;
        }
    }

    /**
     * @notice insert uint152 value to 19-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint152 to add
     */
    function unshiftUint152(Bytes32.Builder memory self, uint152 element) internal pure {
        unchecked {
            self._data = (self._data << 152) | Uint256.toBytes32(element);
            self._size += 152;
        }
    }
    /**
     * @notice parse bytes20 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes20 derived from bytes
     */
    function parseBytes20(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes20 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_20;
        element = bytes20(elementBytes << 96);
    }

    /**
     * @notice insert bytes20 value to 20-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes20 to insert
     * @param offset slot offset in bits
     */
    function insertBytes20(Bytes32.Builder memory self, bytes20 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_20 << offset) | (bytes32(element) >> 96 << offset);
            if (self._size < 160 + offset) self._size = 160 + offset;
        }
    }

    /**
     * @notice insert bytes20 value to 20-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes20 to add
     */
    function pushBytes20(Bytes32.Builder memory self, bytes20 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 96 << self._size;
            self._size += 160;
        }
    }

    /**
     * @notice remove last 20-byte segment from bytes and return as bytes20
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes20 derived from bytes
     */
    function popBytes20(Bytes32.Builder memory self) internal pure returns (bytes20 element) {
        unchecked {
            self._size -= 160;
            bytes32 elementBytes = (self._data >> self._size) & MASK_20;
            element = bytes20(elementBytes << 96);
            self._data &= ~(MASK_20 << self._size);
        }
    }

    /**
     * @notice remove first 20-byte segment from bytes and return as bytes20
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes20 derived from bytes
     */
    function shiftBytes20(Bytes32.Builder memory self) internal pure returns (bytes20 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_20;
            element = bytes20(elementBytes << 96);
            self._data >>= 160;
            self._size -= 160;
        }
    }

    /**
     * @notice insert bytes20 value to 20-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes20 to add
     */
    function unshiftBytes20(Bytes32.Builder memory self, bytes20 element) internal pure {
        unchecked {
            self._data = (self._data << 160) | bytes32(element) >> 96;
            self._size += 160;
        }
    }
    /**
     * @notice parse int160 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int160 derived from bytes
     */
    function parseInt160(Bytes32.Builder memory self, uint256 offset) internal pure returns (int160 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_20;
        element = int160(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int160 value to 20-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int160 to insert
     * @param offset slot offset in bits
     */
    function insertInt160(Bytes32.Builder memory self, int160 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_20 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 96)) << offset);
            if (self._size < 160 + offset) self._size = 160 + offset;
        }
    }

    /**
     * @notice insert int160 value to 20-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int160 to add
     */
    function pushInt160(Bytes32.Builder memory self, int160 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 96)) << self._size;
            self._size += 160;
        }
    }

    /**
     * @notice remove last 20-byte segment from bytes and return as int160
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int160 derived from bytes
     */
    function popInt160(Bytes32.Builder memory self) internal pure returns (int160 element) {
        unchecked {
            self._size -= 160;
            bytes32 elementBytes = (self._data >> self._size) & MASK_20;
            element = int160(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_20 << self._size);
        }
    }

    /**
     * @notice remove first 20-byte segment from bytes and return as int160
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int160 derived from bytes
     */
    function shiftInt160(Bytes32.Builder memory self) internal pure returns (int160 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_20;
            element = int160(Bytes32.toInt256(elementBytes));
            self._data >>= 160;
            self._size -= 160;
        }
    }

    /**
     * @notice insert int160 value to 20-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int160 to add
     */
    function unshiftInt160(Bytes32.Builder memory self, int160 element) internal pure {
        unchecked {
            self._data = (self._data << 160) | (Int256.toBytes32(element) & (~bytes32(0) >> 96));
            self._size += 160;
        }
    }
    /**
     * @notice parse uint160 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint160 derived from bytes
     */
    function parseUint160(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint160 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_20;
        element = uint160(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint160 value to 20-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint160 to insert
     * @param offset slot offset in bits
     */
    function insertUint160(Bytes32.Builder memory self, uint160 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_20 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 160 + offset) self._size = 160 + offset;
        }
    }

    /**
     * @notice insert uint160 value to 20-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint160 to add
     */
    function pushUint160(Bytes32.Builder memory self, uint160 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 160;
        }
    }

    /**
     * @notice remove last 20-byte segment from bytes and return as uint160
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint160 derived from bytes
     */
    function popUint160(Bytes32.Builder memory self) internal pure returns (uint160 element) {
        unchecked {
            self._size -= 160;
            bytes32 elementBytes = (self._data >> self._size) & MASK_20;
            element = uint160(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_20 << self._size);
        }
    }

    /**
     * @notice remove first 20-byte segment from bytes and return as uint160
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint160 derived from bytes
     */
    function shiftUint160(Bytes32.Builder memory self) internal pure returns (uint160 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_20;
            element = uint160(Bytes32.toUint256(elementBytes));
            self._data >>= 160;
            self._size -= 160;
        }
    }

    /**
     * @notice insert uint160 value to 20-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint160 to add
     */
    function unshiftUint160(Bytes32.Builder memory self, uint160 element) internal pure {
        unchecked {
            self._data = (self._data << 160) | Uint256.toBytes32(element);
            self._size += 160;
        }
    }
    /**
     * @notice parse address from bytes at given offset
     * @param offset slot offset in bits
     * @return element address derived from bytes
     */
    function parseAddress(Bytes32.Builder memory self, uint256 offset) internal pure returns (address element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_20;
        element = Bytes32.toAddress(elementBytes);
    }

    /**
     * @notice insert address value to 20-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element address to insert
     * @param offset slot offset in bits
     */
    function insertAddress(Bytes32.Builder memory self, address element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_20 << offset) | (Address.toBytes32(element) << offset);
            if (self._size < 160 + offset) self._size = 160 + offset;
        }
    }

    /**
     * @notice insert address value to 20-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element address to add
     */
    function pushAddress(Bytes32.Builder memory self, address element) internal pure {
        unchecked {
            self._data |= Address.toBytes32(element) << self._size;
            self._size += 160;
        }
    }

    /**
     * @notice remove last 20-byte segment from bytes and return as address
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element address derived from bytes
     */
    function popAddress(Bytes32.Builder memory self) internal pure returns (address element) {
        unchecked {
            self._size -= 160;
            bytes32 elementBytes = (self._data >> self._size) & MASK_20;
            element = Bytes32.toAddress(elementBytes);
            self._data &= ~(MASK_20 << self._size);
        }
    }

    /**
     * @notice remove first 20-byte segment from bytes and return as address
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element address derived from bytes
     */
    function shiftAddress(Bytes32.Builder memory self) internal pure returns (address element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_20;
            element = Bytes32.toAddress(elementBytes);
            self._data >>= 160;
            self._size -= 160;
        }
    }

    /**
     * @notice insert address value to 20-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element address to add
     */
    function unshiftAddress(Bytes32.Builder memory self, address element) internal pure {
        unchecked {
            self._data = (self._data << 160) | Address.toBytes32(element);
            self._size += 160;
        }
    }
    /**
     * @notice parse bytes21 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes21 derived from bytes
     */
    function parseBytes21(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes21 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_21;
        element = bytes21(elementBytes << 88);
    }

    /**
     * @notice insert bytes21 value to 21-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes21 to insert
     * @param offset slot offset in bits
     */
    function insertBytes21(Bytes32.Builder memory self, bytes21 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_21 << offset) | (bytes32(element) >> 88 << offset);
            if (self._size < 168 + offset) self._size = 168 + offset;
        }
    }

    /**
     * @notice insert bytes21 value to 21-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes21 to add
     */
    function pushBytes21(Bytes32.Builder memory self, bytes21 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 88 << self._size;
            self._size += 168;
        }
    }

    /**
     * @notice remove last 21-byte segment from bytes and return as bytes21
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes21 derived from bytes
     */
    function popBytes21(Bytes32.Builder memory self) internal pure returns (bytes21 element) {
        unchecked {
            self._size -= 168;
            bytes32 elementBytes = (self._data >> self._size) & MASK_21;
            element = bytes21(elementBytes << 88);
            self._data &= ~(MASK_21 << self._size);
        }
    }

    /**
     * @notice remove first 21-byte segment from bytes and return as bytes21
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes21 derived from bytes
     */
    function shiftBytes21(Bytes32.Builder memory self) internal pure returns (bytes21 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_21;
            element = bytes21(elementBytes << 88);
            self._data >>= 168;
            self._size -= 168;
        }
    }

    /**
     * @notice insert bytes21 value to 21-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes21 to add
     */
    function unshiftBytes21(Bytes32.Builder memory self, bytes21 element) internal pure {
        unchecked {
            self._data = (self._data << 168) | bytes32(element) >> 88;
            self._size += 168;
        }
    }
    /**
     * @notice parse int168 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int168 derived from bytes
     */
    function parseInt168(Bytes32.Builder memory self, uint256 offset) internal pure returns (int168 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_21;
        element = int168(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int168 value to 21-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int168 to insert
     * @param offset slot offset in bits
     */
    function insertInt168(Bytes32.Builder memory self, int168 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_21 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 88)) << offset);
            if (self._size < 168 + offset) self._size = 168 + offset;
        }
    }

    /**
     * @notice insert int168 value to 21-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int168 to add
     */
    function pushInt168(Bytes32.Builder memory self, int168 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 88)) << self._size;
            self._size += 168;
        }
    }

    /**
     * @notice remove last 21-byte segment from bytes and return as int168
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int168 derived from bytes
     */
    function popInt168(Bytes32.Builder memory self) internal pure returns (int168 element) {
        unchecked {
            self._size -= 168;
            bytes32 elementBytes = (self._data >> self._size) & MASK_21;
            element = int168(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_21 << self._size);
        }
    }

    /**
     * @notice remove first 21-byte segment from bytes and return as int168
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int168 derived from bytes
     */
    function shiftInt168(Bytes32.Builder memory self) internal pure returns (int168 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_21;
            element = int168(Bytes32.toInt256(elementBytes));
            self._data >>= 168;
            self._size -= 168;
        }
    }

    /**
     * @notice insert int168 value to 21-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int168 to add
     */
    function unshiftInt168(Bytes32.Builder memory self, int168 element) internal pure {
        unchecked {
            self._data = (self._data << 168) | (Int256.toBytes32(element) & (~bytes32(0) >> 88));
            self._size += 168;
        }
    }
    /**
     * @notice parse uint168 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint168 derived from bytes
     */
    function parseUint168(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint168 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_21;
        element = uint168(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint168 value to 21-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint168 to insert
     * @param offset slot offset in bits
     */
    function insertUint168(Bytes32.Builder memory self, uint168 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_21 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 168 + offset) self._size = 168 + offset;
        }
    }

    /**
     * @notice insert uint168 value to 21-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint168 to add
     */
    function pushUint168(Bytes32.Builder memory self, uint168 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 168;
        }
    }

    /**
     * @notice remove last 21-byte segment from bytes and return as uint168
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint168 derived from bytes
     */
    function popUint168(Bytes32.Builder memory self) internal pure returns (uint168 element) {
        unchecked {
            self._size -= 168;
            bytes32 elementBytes = (self._data >> self._size) & MASK_21;
            element = uint168(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_21 << self._size);
        }
    }

    /**
     * @notice remove first 21-byte segment from bytes and return as uint168
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint168 derived from bytes
     */
    function shiftUint168(Bytes32.Builder memory self) internal pure returns (uint168 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_21;
            element = uint168(Bytes32.toUint256(elementBytes));
            self._data >>= 168;
            self._size -= 168;
        }
    }

    /**
     * @notice insert uint168 value to 21-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint168 to add
     */
    function unshiftUint168(Bytes32.Builder memory self, uint168 element) internal pure {
        unchecked {
            self._data = (self._data << 168) | Uint256.toBytes32(element);
            self._size += 168;
        }
    }
    /**
     * @notice parse bytes22 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes22 derived from bytes
     */
    function parseBytes22(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes22 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_22;
        element = bytes22(elementBytes << 80);
    }

    /**
     * @notice insert bytes22 value to 22-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes22 to insert
     * @param offset slot offset in bits
     */
    function insertBytes22(Bytes32.Builder memory self, bytes22 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_22 << offset) | (bytes32(element) >> 80 << offset);
            if (self._size < 176 + offset) self._size = 176 + offset;
        }
    }

    /**
     * @notice insert bytes22 value to 22-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes22 to add
     */
    function pushBytes22(Bytes32.Builder memory self, bytes22 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 80 << self._size;
            self._size += 176;
        }
    }

    /**
     * @notice remove last 22-byte segment from bytes and return as bytes22
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes22 derived from bytes
     */
    function popBytes22(Bytes32.Builder memory self) internal pure returns (bytes22 element) {
        unchecked {
            self._size -= 176;
            bytes32 elementBytes = (self._data >> self._size) & MASK_22;
            element = bytes22(elementBytes << 80);
            self._data &= ~(MASK_22 << self._size);
        }
    }

    /**
     * @notice remove first 22-byte segment from bytes and return as bytes22
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes22 derived from bytes
     */
    function shiftBytes22(Bytes32.Builder memory self) internal pure returns (bytes22 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_22;
            element = bytes22(elementBytes << 80);
            self._data >>= 176;
            self._size -= 176;
        }
    }

    /**
     * @notice insert bytes22 value to 22-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes22 to add
     */
    function unshiftBytes22(Bytes32.Builder memory self, bytes22 element) internal pure {
        unchecked {
            self._data = (self._data << 176) | bytes32(element) >> 80;
            self._size += 176;
        }
    }
    /**
     * @notice parse int176 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int176 derived from bytes
     */
    function parseInt176(Bytes32.Builder memory self, uint256 offset) internal pure returns (int176 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_22;
        element = int176(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int176 value to 22-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int176 to insert
     * @param offset slot offset in bits
     */
    function insertInt176(Bytes32.Builder memory self, int176 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_22 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 80)) << offset);
            if (self._size < 176 + offset) self._size = 176 + offset;
        }
    }

    /**
     * @notice insert int176 value to 22-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int176 to add
     */
    function pushInt176(Bytes32.Builder memory self, int176 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 80)) << self._size;
            self._size += 176;
        }
    }

    /**
     * @notice remove last 22-byte segment from bytes and return as int176
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int176 derived from bytes
     */
    function popInt176(Bytes32.Builder memory self) internal pure returns (int176 element) {
        unchecked {
            self._size -= 176;
            bytes32 elementBytes = (self._data >> self._size) & MASK_22;
            element = int176(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_22 << self._size);
        }
    }

    /**
     * @notice remove first 22-byte segment from bytes and return as int176
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int176 derived from bytes
     */
    function shiftInt176(Bytes32.Builder memory self) internal pure returns (int176 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_22;
            element = int176(Bytes32.toInt256(elementBytes));
            self._data >>= 176;
            self._size -= 176;
        }
    }

    /**
     * @notice insert int176 value to 22-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int176 to add
     */
    function unshiftInt176(Bytes32.Builder memory self, int176 element) internal pure {
        unchecked {
            self._data = (self._data << 176) | (Int256.toBytes32(element) & (~bytes32(0) >> 80));
            self._size += 176;
        }
    }
    /**
     * @notice parse uint176 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint176 derived from bytes
     */
    function parseUint176(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint176 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_22;
        element = uint176(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint176 value to 22-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint176 to insert
     * @param offset slot offset in bits
     */
    function insertUint176(Bytes32.Builder memory self, uint176 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_22 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 176 + offset) self._size = 176 + offset;
        }
    }

    /**
     * @notice insert uint176 value to 22-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint176 to add
     */
    function pushUint176(Bytes32.Builder memory self, uint176 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 176;
        }
    }

    /**
     * @notice remove last 22-byte segment from bytes and return as uint176
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint176 derived from bytes
     */
    function popUint176(Bytes32.Builder memory self) internal pure returns (uint176 element) {
        unchecked {
            self._size -= 176;
            bytes32 elementBytes = (self._data >> self._size) & MASK_22;
            element = uint176(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_22 << self._size);
        }
    }

    /**
     * @notice remove first 22-byte segment from bytes and return as uint176
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint176 derived from bytes
     */
    function shiftUint176(Bytes32.Builder memory self) internal pure returns (uint176 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_22;
            element = uint176(Bytes32.toUint256(elementBytes));
            self._data >>= 176;
            self._size -= 176;
        }
    }

    /**
     * @notice insert uint176 value to 22-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint176 to add
     */
    function unshiftUint176(Bytes32.Builder memory self, uint176 element) internal pure {
        unchecked {
            self._data = (self._data << 176) | Uint256.toBytes32(element);
            self._size += 176;
        }
    }
    /**
     * @notice parse bytes23 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes23 derived from bytes
     */
    function parseBytes23(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes23 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_23;
        element = bytes23(elementBytes << 72);
    }

    /**
     * @notice insert bytes23 value to 23-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes23 to insert
     * @param offset slot offset in bits
     */
    function insertBytes23(Bytes32.Builder memory self, bytes23 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_23 << offset) | (bytes32(element) >> 72 << offset);
            if (self._size < 184 + offset) self._size = 184 + offset;
        }
    }

    /**
     * @notice insert bytes23 value to 23-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes23 to add
     */
    function pushBytes23(Bytes32.Builder memory self, bytes23 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 72 << self._size;
            self._size += 184;
        }
    }

    /**
     * @notice remove last 23-byte segment from bytes and return as bytes23
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes23 derived from bytes
     */
    function popBytes23(Bytes32.Builder memory self) internal pure returns (bytes23 element) {
        unchecked {
            self._size -= 184;
            bytes32 elementBytes = (self._data >> self._size) & MASK_23;
            element = bytes23(elementBytes << 72);
            self._data &= ~(MASK_23 << self._size);
        }
    }

    /**
     * @notice remove first 23-byte segment from bytes and return as bytes23
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes23 derived from bytes
     */
    function shiftBytes23(Bytes32.Builder memory self) internal pure returns (bytes23 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_23;
            element = bytes23(elementBytes << 72);
            self._data >>= 184;
            self._size -= 184;
        }
    }

    /**
     * @notice insert bytes23 value to 23-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes23 to add
     */
    function unshiftBytes23(Bytes32.Builder memory self, bytes23 element) internal pure {
        unchecked {
            self._data = (self._data << 184) | bytes32(element) >> 72;
            self._size += 184;
        }
    }
    /**
     * @notice parse int184 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int184 derived from bytes
     */
    function parseInt184(Bytes32.Builder memory self, uint256 offset) internal pure returns (int184 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_23;
        element = int184(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int184 value to 23-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int184 to insert
     * @param offset slot offset in bits
     */
    function insertInt184(Bytes32.Builder memory self, int184 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_23 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 72)) << offset);
            if (self._size < 184 + offset) self._size = 184 + offset;
        }
    }

    /**
     * @notice insert int184 value to 23-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int184 to add
     */
    function pushInt184(Bytes32.Builder memory self, int184 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 72)) << self._size;
            self._size += 184;
        }
    }

    /**
     * @notice remove last 23-byte segment from bytes and return as int184
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int184 derived from bytes
     */
    function popInt184(Bytes32.Builder memory self) internal pure returns (int184 element) {
        unchecked {
            self._size -= 184;
            bytes32 elementBytes = (self._data >> self._size) & MASK_23;
            element = int184(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_23 << self._size);
        }
    }

    /**
     * @notice remove first 23-byte segment from bytes and return as int184
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int184 derived from bytes
     */
    function shiftInt184(Bytes32.Builder memory self) internal pure returns (int184 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_23;
            element = int184(Bytes32.toInt256(elementBytes));
            self._data >>= 184;
            self._size -= 184;
        }
    }

    /**
     * @notice insert int184 value to 23-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int184 to add
     */
    function unshiftInt184(Bytes32.Builder memory self, int184 element) internal pure {
        unchecked {
            self._data = (self._data << 184) | (Int256.toBytes32(element) & (~bytes32(0) >> 72));
            self._size += 184;
        }
    }
    /**
     * @notice parse uint184 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint184 derived from bytes
     */
    function parseUint184(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint184 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_23;
        element = uint184(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint184 value to 23-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint184 to insert
     * @param offset slot offset in bits
     */
    function insertUint184(Bytes32.Builder memory self, uint184 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_23 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 184 + offset) self._size = 184 + offset;
        }
    }

    /**
     * @notice insert uint184 value to 23-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint184 to add
     */
    function pushUint184(Bytes32.Builder memory self, uint184 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 184;
        }
    }

    /**
     * @notice remove last 23-byte segment from bytes and return as uint184
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint184 derived from bytes
     */
    function popUint184(Bytes32.Builder memory self) internal pure returns (uint184 element) {
        unchecked {
            self._size -= 184;
            bytes32 elementBytes = (self._data >> self._size) & MASK_23;
            element = uint184(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_23 << self._size);
        }
    }

    /**
     * @notice remove first 23-byte segment from bytes and return as uint184
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint184 derived from bytes
     */
    function shiftUint184(Bytes32.Builder memory self) internal pure returns (uint184 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_23;
            element = uint184(Bytes32.toUint256(elementBytes));
            self._data >>= 184;
            self._size -= 184;
        }
    }

    /**
     * @notice insert uint184 value to 23-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint184 to add
     */
    function unshiftUint184(Bytes32.Builder memory self, uint184 element) internal pure {
        unchecked {
            self._data = (self._data << 184) | Uint256.toBytes32(element);
            self._size += 184;
        }
    }
    /**
     * @notice parse bytes24 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes24 derived from bytes
     */
    function parseBytes24(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes24 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_24;
        element = bytes24(elementBytes << 64);
    }

    /**
     * @notice insert bytes24 value to 24-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes24 to insert
     * @param offset slot offset in bits
     */
    function insertBytes24(Bytes32.Builder memory self, bytes24 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_24 << offset) | (bytes32(element) >> 64 << offset);
            if (self._size < 192 + offset) self._size = 192 + offset;
        }
    }

    /**
     * @notice insert bytes24 value to 24-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes24 to add
     */
    function pushBytes24(Bytes32.Builder memory self, bytes24 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 64 << self._size;
            self._size += 192;
        }
    }

    /**
     * @notice remove last 24-byte segment from bytes and return as bytes24
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes24 derived from bytes
     */
    function popBytes24(Bytes32.Builder memory self) internal pure returns (bytes24 element) {
        unchecked {
            self._size -= 192;
            bytes32 elementBytes = (self._data >> self._size) & MASK_24;
            element = bytes24(elementBytes << 64);
            self._data &= ~(MASK_24 << self._size);
        }
    }

    /**
     * @notice remove first 24-byte segment from bytes and return as bytes24
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes24 derived from bytes
     */
    function shiftBytes24(Bytes32.Builder memory self) internal pure returns (bytes24 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_24;
            element = bytes24(elementBytes << 64);
            self._data >>= 192;
            self._size -= 192;
        }
    }

    /**
     * @notice insert bytes24 value to 24-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes24 to add
     */
    function unshiftBytes24(Bytes32.Builder memory self, bytes24 element) internal pure {
        unchecked {
            self._data = (self._data << 192) | bytes32(element) >> 64;
            self._size += 192;
        }
    }
    /**
     * @notice parse int192 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int192 derived from bytes
     */
    function parseInt192(Bytes32.Builder memory self, uint256 offset) internal pure returns (int192 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_24;
        element = int192(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int192 value to 24-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int192 to insert
     * @param offset slot offset in bits
     */
    function insertInt192(Bytes32.Builder memory self, int192 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_24 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 64)) << offset);
            if (self._size < 192 + offset) self._size = 192 + offset;
        }
    }

    /**
     * @notice insert int192 value to 24-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int192 to add
     */
    function pushInt192(Bytes32.Builder memory self, int192 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 64)) << self._size;
            self._size += 192;
        }
    }

    /**
     * @notice remove last 24-byte segment from bytes and return as int192
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int192 derived from bytes
     */
    function popInt192(Bytes32.Builder memory self) internal pure returns (int192 element) {
        unchecked {
            self._size -= 192;
            bytes32 elementBytes = (self._data >> self._size) & MASK_24;
            element = int192(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_24 << self._size);
        }
    }

    /**
     * @notice remove first 24-byte segment from bytes and return as int192
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int192 derived from bytes
     */
    function shiftInt192(Bytes32.Builder memory self) internal pure returns (int192 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_24;
            element = int192(Bytes32.toInt256(elementBytes));
            self._data >>= 192;
            self._size -= 192;
        }
    }

    /**
     * @notice insert int192 value to 24-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int192 to add
     */
    function unshiftInt192(Bytes32.Builder memory self, int192 element) internal pure {
        unchecked {
            self._data = (self._data << 192) | (Int256.toBytes32(element) & (~bytes32(0) >> 64));
            self._size += 192;
        }
    }
    /**
     * @notice parse uint192 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint192 derived from bytes
     */
    function parseUint192(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint192 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_24;
        element = uint192(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint192 value to 24-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint192 to insert
     * @param offset slot offset in bits
     */
    function insertUint192(Bytes32.Builder memory self, uint192 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_24 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 192 + offset) self._size = 192 + offset;
        }
    }

    /**
     * @notice insert uint192 value to 24-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint192 to add
     */
    function pushUint192(Bytes32.Builder memory self, uint192 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 192;
        }
    }

    /**
     * @notice remove last 24-byte segment from bytes and return as uint192
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint192 derived from bytes
     */
    function popUint192(Bytes32.Builder memory self) internal pure returns (uint192 element) {
        unchecked {
            self._size -= 192;
            bytes32 elementBytes = (self._data >> self._size) & MASK_24;
            element = uint192(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_24 << self._size);
        }
    }

    /**
     * @notice remove first 24-byte segment from bytes and return as uint192
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint192 derived from bytes
     */
    function shiftUint192(Bytes32.Builder memory self) internal pure returns (uint192 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_24;
            element = uint192(Bytes32.toUint256(elementBytes));
            self._data >>= 192;
            self._size -= 192;
        }
    }

    /**
     * @notice insert uint192 value to 24-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint192 to add
     */
    function unshiftUint192(Bytes32.Builder memory self, uint192 element) internal pure {
        unchecked {
            self._data = (self._data << 192) | Uint256.toBytes32(element);
            self._size += 192;
        }
    }
    /**
     * @notice parse bytes25 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes25 derived from bytes
     */
    function parseBytes25(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes25 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_25;
        element = bytes25(elementBytes << 56);
    }

    /**
     * @notice insert bytes25 value to 25-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes25 to insert
     * @param offset slot offset in bits
     */
    function insertBytes25(Bytes32.Builder memory self, bytes25 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_25 << offset) | (bytes32(element) >> 56 << offset);
            if (self._size < 200 + offset) self._size = 200 + offset;
        }
    }

    /**
     * @notice insert bytes25 value to 25-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes25 to add
     */
    function pushBytes25(Bytes32.Builder memory self, bytes25 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 56 << self._size;
            self._size += 200;
        }
    }

    /**
     * @notice remove last 25-byte segment from bytes and return as bytes25
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes25 derived from bytes
     */
    function popBytes25(Bytes32.Builder memory self) internal pure returns (bytes25 element) {
        unchecked {
            self._size -= 200;
            bytes32 elementBytes = (self._data >> self._size) & MASK_25;
            element = bytes25(elementBytes << 56);
            self._data &= ~(MASK_25 << self._size);
        }
    }

    /**
     * @notice remove first 25-byte segment from bytes and return as bytes25
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes25 derived from bytes
     */
    function shiftBytes25(Bytes32.Builder memory self) internal pure returns (bytes25 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_25;
            element = bytes25(elementBytes << 56);
            self._data >>= 200;
            self._size -= 200;
        }
    }

    /**
     * @notice insert bytes25 value to 25-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes25 to add
     */
    function unshiftBytes25(Bytes32.Builder memory self, bytes25 element) internal pure {
        unchecked {
            self._data = (self._data << 200) | bytes32(element) >> 56;
            self._size += 200;
        }
    }
    /**
     * @notice parse int200 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int200 derived from bytes
     */
    function parseInt200(Bytes32.Builder memory self, uint256 offset) internal pure returns (int200 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_25;
        element = int200(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int200 value to 25-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int200 to insert
     * @param offset slot offset in bits
     */
    function insertInt200(Bytes32.Builder memory self, int200 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_25 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 56)) << offset);
            if (self._size < 200 + offset) self._size = 200 + offset;
        }
    }

    /**
     * @notice insert int200 value to 25-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int200 to add
     */
    function pushInt200(Bytes32.Builder memory self, int200 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 56)) << self._size;
            self._size += 200;
        }
    }

    /**
     * @notice remove last 25-byte segment from bytes and return as int200
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int200 derived from bytes
     */
    function popInt200(Bytes32.Builder memory self) internal pure returns (int200 element) {
        unchecked {
            self._size -= 200;
            bytes32 elementBytes = (self._data >> self._size) & MASK_25;
            element = int200(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_25 << self._size);
        }
    }

    /**
     * @notice remove first 25-byte segment from bytes and return as int200
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int200 derived from bytes
     */
    function shiftInt200(Bytes32.Builder memory self) internal pure returns (int200 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_25;
            element = int200(Bytes32.toInt256(elementBytes));
            self._data >>= 200;
            self._size -= 200;
        }
    }

    /**
     * @notice insert int200 value to 25-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int200 to add
     */
    function unshiftInt200(Bytes32.Builder memory self, int200 element) internal pure {
        unchecked {
            self._data = (self._data << 200) | (Int256.toBytes32(element) & (~bytes32(0) >> 56));
            self._size += 200;
        }
    }
    /**
     * @notice parse uint200 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint200 derived from bytes
     */
    function parseUint200(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint200 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_25;
        element = uint200(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint200 value to 25-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint200 to insert
     * @param offset slot offset in bits
     */
    function insertUint200(Bytes32.Builder memory self, uint200 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_25 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 200 + offset) self._size = 200 + offset;
        }
    }

    /**
     * @notice insert uint200 value to 25-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint200 to add
     */
    function pushUint200(Bytes32.Builder memory self, uint200 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 200;
        }
    }

    /**
     * @notice remove last 25-byte segment from bytes and return as uint200
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint200 derived from bytes
     */
    function popUint200(Bytes32.Builder memory self) internal pure returns (uint200 element) {
        unchecked {
            self._size -= 200;
            bytes32 elementBytes = (self._data >> self._size) & MASK_25;
            element = uint200(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_25 << self._size);
        }
    }

    /**
     * @notice remove first 25-byte segment from bytes and return as uint200
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint200 derived from bytes
     */
    function shiftUint200(Bytes32.Builder memory self) internal pure returns (uint200 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_25;
            element = uint200(Bytes32.toUint256(elementBytes));
            self._data >>= 200;
            self._size -= 200;
        }
    }

    /**
     * @notice insert uint200 value to 25-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint200 to add
     */
    function unshiftUint200(Bytes32.Builder memory self, uint200 element) internal pure {
        unchecked {
            self._data = (self._data << 200) | Uint256.toBytes32(element);
            self._size += 200;
        }
    }
    /**
     * @notice parse bytes26 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes26 derived from bytes
     */
    function parseBytes26(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes26 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_26;
        element = bytes26(elementBytes << 48);
    }

    /**
     * @notice insert bytes26 value to 26-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes26 to insert
     * @param offset slot offset in bits
     */
    function insertBytes26(Bytes32.Builder memory self, bytes26 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_26 << offset) | (bytes32(element) >> 48 << offset);
            if (self._size < 208 + offset) self._size = 208 + offset;
        }
    }

    /**
     * @notice insert bytes26 value to 26-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes26 to add
     */
    function pushBytes26(Bytes32.Builder memory self, bytes26 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 48 << self._size;
            self._size += 208;
        }
    }

    /**
     * @notice remove last 26-byte segment from bytes and return as bytes26
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes26 derived from bytes
     */
    function popBytes26(Bytes32.Builder memory self) internal pure returns (bytes26 element) {
        unchecked {
            self._size -= 208;
            bytes32 elementBytes = (self._data >> self._size) & MASK_26;
            element = bytes26(elementBytes << 48);
            self._data &= ~(MASK_26 << self._size);
        }
    }

    /**
     * @notice remove first 26-byte segment from bytes and return as bytes26
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes26 derived from bytes
     */
    function shiftBytes26(Bytes32.Builder memory self) internal pure returns (bytes26 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_26;
            element = bytes26(elementBytes << 48);
            self._data >>= 208;
            self._size -= 208;
        }
    }

    /**
     * @notice insert bytes26 value to 26-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes26 to add
     */
    function unshiftBytes26(Bytes32.Builder memory self, bytes26 element) internal pure {
        unchecked {
            self._data = (self._data << 208) | bytes32(element) >> 48;
            self._size += 208;
        }
    }
    /**
     * @notice parse int208 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int208 derived from bytes
     */
    function parseInt208(Bytes32.Builder memory self, uint256 offset) internal pure returns (int208 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_26;
        element = int208(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int208 value to 26-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int208 to insert
     * @param offset slot offset in bits
     */
    function insertInt208(Bytes32.Builder memory self, int208 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_26 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 48)) << offset);
            if (self._size < 208 + offset) self._size = 208 + offset;
        }
    }

    /**
     * @notice insert int208 value to 26-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int208 to add
     */
    function pushInt208(Bytes32.Builder memory self, int208 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 48)) << self._size;
            self._size += 208;
        }
    }

    /**
     * @notice remove last 26-byte segment from bytes and return as int208
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int208 derived from bytes
     */
    function popInt208(Bytes32.Builder memory self) internal pure returns (int208 element) {
        unchecked {
            self._size -= 208;
            bytes32 elementBytes = (self._data >> self._size) & MASK_26;
            element = int208(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_26 << self._size);
        }
    }

    /**
     * @notice remove first 26-byte segment from bytes and return as int208
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int208 derived from bytes
     */
    function shiftInt208(Bytes32.Builder memory self) internal pure returns (int208 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_26;
            element = int208(Bytes32.toInt256(elementBytes));
            self._data >>= 208;
            self._size -= 208;
        }
    }

    /**
     * @notice insert int208 value to 26-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int208 to add
     */
    function unshiftInt208(Bytes32.Builder memory self, int208 element) internal pure {
        unchecked {
            self._data = (self._data << 208) | (Int256.toBytes32(element) & (~bytes32(0) >> 48));
            self._size += 208;
        }
    }
    /**
     * @notice parse uint208 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint208 derived from bytes
     */
    function parseUint208(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint208 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_26;
        element = uint208(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint208 value to 26-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint208 to insert
     * @param offset slot offset in bits
     */
    function insertUint208(Bytes32.Builder memory self, uint208 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_26 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 208 + offset) self._size = 208 + offset;
        }
    }

    /**
     * @notice insert uint208 value to 26-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint208 to add
     */
    function pushUint208(Bytes32.Builder memory self, uint208 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 208;
        }
    }

    /**
     * @notice remove last 26-byte segment from bytes and return as uint208
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint208 derived from bytes
     */
    function popUint208(Bytes32.Builder memory self) internal pure returns (uint208 element) {
        unchecked {
            self._size -= 208;
            bytes32 elementBytes = (self._data >> self._size) & MASK_26;
            element = uint208(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_26 << self._size);
        }
    }

    /**
     * @notice remove first 26-byte segment from bytes and return as uint208
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint208 derived from bytes
     */
    function shiftUint208(Bytes32.Builder memory self) internal pure returns (uint208 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_26;
            element = uint208(Bytes32.toUint256(elementBytes));
            self._data >>= 208;
            self._size -= 208;
        }
    }

    /**
     * @notice insert uint208 value to 26-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint208 to add
     */
    function unshiftUint208(Bytes32.Builder memory self, uint208 element) internal pure {
        unchecked {
            self._data = (self._data << 208) | Uint256.toBytes32(element);
            self._size += 208;
        }
    }
    /**
     * @notice parse bytes27 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes27 derived from bytes
     */
    function parseBytes27(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes27 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_27;
        element = bytes27(elementBytes << 40);
    }

    /**
     * @notice insert bytes27 value to 27-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes27 to insert
     * @param offset slot offset in bits
     */
    function insertBytes27(Bytes32.Builder memory self, bytes27 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_27 << offset) | (bytes32(element) >> 40 << offset);
            if (self._size < 216 + offset) self._size = 216 + offset;
        }
    }

    /**
     * @notice insert bytes27 value to 27-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes27 to add
     */
    function pushBytes27(Bytes32.Builder memory self, bytes27 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 40 << self._size;
            self._size += 216;
        }
    }

    /**
     * @notice remove last 27-byte segment from bytes and return as bytes27
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes27 derived from bytes
     */
    function popBytes27(Bytes32.Builder memory self) internal pure returns (bytes27 element) {
        unchecked {
            self._size -= 216;
            bytes32 elementBytes = (self._data >> self._size) & MASK_27;
            element = bytes27(elementBytes << 40);
            self._data &= ~(MASK_27 << self._size);
        }
    }

    /**
     * @notice remove first 27-byte segment from bytes and return as bytes27
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes27 derived from bytes
     */
    function shiftBytes27(Bytes32.Builder memory self) internal pure returns (bytes27 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_27;
            element = bytes27(elementBytes << 40);
            self._data >>= 216;
            self._size -= 216;
        }
    }

    /**
     * @notice insert bytes27 value to 27-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes27 to add
     */
    function unshiftBytes27(Bytes32.Builder memory self, bytes27 element) internal pure {
        unchecked {
            self._data = (self._data << 216) | bytes32(element) >> 40;
            self._size += 216;
        }
    }
    /**
     * @notice parse int216 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int216 derived from bytes
     */
    function parseInt216(Bytes32.Builder memory self, uint256 offset) internal pure returns (int216 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_27;
        element = int216(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int216 value to 27-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int216 to insert
     * @param offset slot offset in bits
     */
    function insertInt216(Bytes32.Builder memory self, int216 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_27 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 40)) << offset);
            if (self._size < 216 + offset) self._size = 216 + offset;
        }
    }

    /**
     * @notice insert int216 value to 27-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int216 to add
     */
    function pushInt216(Bytes32.Builder memory self, int216 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 40)) << self._size;
            self._size += 216;
        }
    }

    /**
     * @notice remove last 27-byte segment from bytes and return as int216
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int216 derived from bytes
     */
    function popInt216(Bytes32.Builder memory self) internal pure returns (int216 element) {
        unchecked {
            self._size -= 216;
            bytes32 elementBytes = (self._data >> self._size) & MASK_27;
            element = int216(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_27 << self._size);
        }
    }

    /**
     * @notice remove first 27-byte segment from bytes and return as int216
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int216 derived from bytes
     */
    function shiftInt216(Bytes32.Builder memory self) internal pure returns (int216 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_27;
            element = int216(Bytes32.toInt256(elementBytes));
            self._data >>= 216;
            self._size -= 216;
        }
    }

    /**
     * @notice insert int216 value to 27-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int216 to add
     */
    function unshiftInt216(Bytes32.Builder memory self, int216 element) internal pure {
        unchecked {
            self._data = (self._data << 216) | (Int256.toBytes32(element) & (~bytes32(0) >> 40));
            self._size += 216;
        }
    }
    /**
     * @notice parse uint216 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint216 derived from bytes
     */
    function parseUint216(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint216 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_27;
        element = uint216(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint216 value to 27-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint216 to insert
     * @param offset slot offset in bits
     */
    function insertUint216(Bytes32.Builder memory self, uint216 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_27 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 216 + offset) self._size = 216 + offset;
        }
    }

    /**
     * @notice insert uint216 value to 27-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint216 to add
     */
    function pushUint216(Bytes32.Builder memory self, uint216 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 216;
        }
    }

    /**
     * @notice remove last 27-byte segment from bytes and return as uint216
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint216 derived from bytes
     */
    function popUint216(Bytes32.Builder memory self) internal pure returns (uint216 element) {
        unchecked {
            self._size -= 216;
            bytes32 elementBytes = (self._data >> self._size) & MASK_27;
            element = uint216(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_27 << self._size);
        }
    }

    /**
     * @notice remove first 27-byte segment from bytes and return as uint216
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint216 derived from bytes
     */
    function shiftUint216(Bytes32.Builder memory self) internal pure returns (uint216 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_27;
            element = uint216(Bytes32.toUint256(elementBytes));
            self._data >>= 216;
            self._size -= 216;
        }
    }

    /**
     * @notice insert uint216 value to 27-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint216 to add
     */
    function unshiftUint216(Bytes32.Builder memory self, uint216 element) internal pure {
        unchecked {
            self._data = (self._data << 216) | Uint256.toBytes32(element);
            self._size += 216;
        }
    }
    /**
     * @notice parse bytes28 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes28 derived from bytes
     */
    function parseBytes28(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes28 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_28;
        element = bytes28(elementBytes << 32);
    }

    /**
     * @notice insert bytes28 value to 28-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes28 to insert
     * @param offset slot offset in bits
     */
    function insertBytes28(Bytes32.Builder memory self, bytes28 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_28 << offset) | (bytes32(element) >> 32 << offset);
            if (self._size < 224 + offset) self._size = 224 + offset;
        }
    }

    /**
     * @notice insert bytes28 value to 28-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes28 to add
     */
    function pushBytes28(Bytes32.Builder memory self, bytes28 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 32 << self._size;
            self._size += 224;
        }
    }

    /**
     * @notice remove last 28-byte segment from bytes and return as bytes28
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes28 derived from bytes
     */
    function popBytes28(Bytes32.Builder memory self) internal pure returns (bytes28 element) {
        unchecked {
            self._size -= 224;
            bytes32 elementBytes = (self._data >> self._size) & MASK_28;
            element = bytes28(elementBytes << 32);
            self._data &= ~(MASK_28 << self._size);
        }
    }

    /**
     * @notice remove first 28-byte segment from bytes and return as bytes28
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes28 derived from bytes
     */
    function shiftBytes28(Bytes32.Builder memory self) internal pure returns (bytes28 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_28;
            element = bytes28(elementBytes << 32);
            self._data >>= 224;
            self._size -= 224;
        }
    }

    /**
     * @notice insert bytes28 value to 28-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes28 to add
     */
    function unshiftBytes28(Bytes32.Builder memory self, bytes28 element) internal pure {
        unchecked {
            self._data = (self._data << 224) | bytes32(element) >> 32;
            self._size += 224;
        }
    }
    /**
     * @notice parse int224 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int224 derived from bytes
     */
    function parseInt224(Bytes32.Builder memory self, uint256 offset) internal pure returns (int224 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_28;
        element = int224(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int224 value to 28-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int224 to insert
     * @param offset slot offset in bits
     */
    function insertInt224(Bytes32.Builder memory self, int224 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_28 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 32)) << offset);
            if (self._size < 224 + offset) self._size = 224 + offset;
        }
    }

    /**
     * @notice insert int224 value to 28-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int224 to add
     */
    function pushInt224(Bytes32.Builder memory self, int224 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 32)) << self._size;
            self._size += 224;
        }
    }

    /**
     * @notice remove last 28-byte segment from bytes and return as int224
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int224 derived from bytes
     */
    function popInt224(Bytes32.Builder memory self) internal pure returns (int224 element) {
        unchecked {
            self._size -= 224;
            bytes32 elementBytes = (self._data >> self._size) & MASK_28;
            element = int224(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_28 << self._size);
        }
    }

    /**
     * @notice remove first 28-byte segment from bytes and return as int224
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int224 derived from bytes
     */
    function shiftInt224(Bytes32.Builder memory self) internal pure returns (int224 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_28;
            element = int224(Bytes32.toInt256(elementBytes));
            self._data >>= 224;
            self._size -= 224;
        }
    }

    /**
     * @notice insert int224 value to 28-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int224 to add
     */
    function unshiftInt224(Bytes32.Builder memory self, int224 element) internal pure {
        unchecked {
            self._data = (self._data << 224) | (Int256.toBytes32(element) & (~bytes32(0) >> 32));
            self._size += 224;
        }
    }
    /**
     * @notice parse uint224 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint224 derived from bytes
     */
    function parseUint224(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint224 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_28;
        element = uint224(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint224 value to 28-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint224 to insert
     * @param offset slot offset in bits
     */
    function insertUint224(Bytes32.Builder memory self, uint224 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_28 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 224 + offset) self._size = 224 + offset;
        }
    }

    /**
     * @notice insert uint224 value to 28-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint224 to add
     */
    function pushUint224(Bytes32.Builder memory self, uint224 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 224;
        }
    }

    /**
     * @notice remove last 28-byte segment from bytes and return as uint224
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint224 derived from bytes
     */
    function popUint224(Bytes32.Builder memory self) internal pure returns (uint224 element) {
        unchecked {
            self._size -= 224;
            bytes32 elementBytes = (self._data >> self._size) & MASK_28;
            element = uint224(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_28 << self._size);
        }
    }

    /**
     * @notice remove first 28-byte segment from bytes and return as uint224
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint224 derived from bytes
     */
    function shiftUint224(Bytes32.Builder memory self) internal pure returns (uint224 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_28;
            element = uint224(Bytes32.toUint256(elementBytes));
            self._data >>= 224;
            self._size -= 224;
        }
    }

    /**
     * @notice insert uint224 value to 28-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint224 to add
     */
    function unshiftUint224(Bytes32.Builder memory self, uint224 element) internal pure {
        unchecked {
            self._data = (self._data << 224) | Uint256.toBytes32(element);
            self._size += 224;
        }
    }
    /**
     * @notice parse bytes29 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes29 derived from bytes
     */
    function parseBytes29(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes29 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_29;
        element = bytes29(elementBytes << 24);
    }

    /**
     * @notice insert bytes29 value to 29-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes29 to insert
     * @param offset slot offset in bits
     */
    function insertBytes29(Bytes32.Builder memory self, bytes29 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_29 << offset) | (bytes32(element) >> 24 << offset);
            if (self._size < 232 + offset) self._size = 232 + offset;
        }
    }

    /**
     * @notice insert bytes29 value to 29-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes29 to add
     */
    function pushBytes29(Bytes32.Builder memory self, bytes29 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 24 << self._size;
            self._size += 232;
        }
    }

    /**
     * @notice remove last 29-byte segment from bytes and return as bytes29
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes29 derived from bytes
     */
    function popBytes29(Bytes32.Builder memory self) internal pure returns (bytes29 element) {
        unchecked {
            self._size -= 232;
            bytes32 elementBytes = (self._data >> self._size) & MASK_29;
            element = bytes29(elementBytes << 24);
            self._data &= ~(MASK_29 << self._size);
        }
    }

    /**
     * @notice remove first 29-byte segment from bytes and return as bytes29
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes29 derived from bytes
     */
    function shiftBytes29(Bytes32.Builder memory self) internal pure returns (bytes29 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_29;
            element = bytes29(elementBytes << 24);
            self._data >>= 232;
            self._size -= 232;
        }
    }

    /**
     * @notice insert bytes29 value to 29-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes29 to add
     */
    function unshiftBytes29(Bytes32.Builder memory self, bytes29 element) internal pure {
        unchecked {
            self._data = (self._data << 232) | bytes32(element) >> 24;
            self._size += 232;
        }
    }
    /**
     * @notice parse int232 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int232 derived from bytes
     */
    function parseInt232(Bytes32.Builder memory self, uint256 offset) internal pure returns (int232 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_29;
        element = int232(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int232 value to 29-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int232 to insert
     * @param offset slot offset in bits
     */
    function insertInt232(Bytes32.Builder memory self, int232 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_29 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 24)) << offset);
            if (self._size < 232 + offset) self._size = 232 + offset;
        }
    }

    /**
     * @notice insert int232 value to 29-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int232 to add
     */
    function pushInt232(Bytes32.Builder memory self, int232 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 24)) << self._size;
            self._size += 232;
        }
    }

    /**
     * @notice remove last 29-byte segment from bytes and return as int232
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int232 derived from bytes
     */
    function popInt232(Bytes32.Builder memory self) internal pure returns (int232 element) {
        unchecked {
            self._size -= 232;
            bytes32 elementBytes = (self._data >> self._size) & MASK_29;
            element = int232(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_29 << self._size);
        }
    }

    /**
     * @notice remove first 29-byte segment from bytes and return as int232
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int232 derived from bytes
     */
    function shiftInt232(Bytes32.Builder memory self) internal pure returns (int232 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_29;
            element = int232(Bytes32.toInt256(elementBytes));
            self._data >>= 232;
            self._size -= 232;
        }
    }

    /**
     * @notice insert int232 value to 29-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int232 to add
     */
    function unshiftInt232(Bytes32.Builder memory self, int232 element) internal pure {
        unchecked {
            self._data = (self._data << 232) | (Int256.toBytes32(element) & (~bytes32(0) >> 24));
            self._size += 232;
        }
    }
    /**
     * @notice parse uint232 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint232 derived from bytes
     */
    function parseUint232(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint232 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_29;
        element = uint232(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint232 value to 29-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint232 to insert
     * @param offset slot offset in bits
     */
    function insertUint232(Bytes32.Builder memory self, uint232 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_29 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 232 + offset) self._size = 232 + offset;
        }
    }

    /**
     * @notice insert uint232 value to 29-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint232 to add
     */
    function pushUint232(Bytes32.Builder memory self, uint232 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 232;
        }
    }

    /**
     * @notice remove last 29-byte segment from bytes and return as uint232
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint232 derived from bytes
     */
    function popUint232(Bytes32.Builder memory self) internal pure returns (uint232 element) {
        unchecked {
            self._size -= 232;
            bytes32 elementBytes = (self._data >> self._size) & MASK_29;
            element = uint232(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_29 << self._size);
        }
    }

    /**
     * @notice remove first 29-byte segment from bytes and return as uint232
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint232 derived from bytes
     */
    function shiftUint232(Bytes32.Builder memory self) internal pure returns (uint232 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_29;
            element = uint232(Bytes32.toUint256(elementBytes));
            self._data >>= 232;
            self._size -= 232;
        }
    }

    /**
     * @notice insert uint232 value to 29-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint232 to add
     */
    function unshiftUint232(Bytes32.Builder memory self, uint232 element) internal pure {
        unchecked {
            self._data = (self._data << 232) | Uint256.toBytes32(element);
            self._size += 232;
        }
    }
    /**
     * @notice parse bytes30 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes30 derived from bytes
     */
    function parseBytes30(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes30 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_30;
        element = bytes30(elementBytes << 16);
    }

    /**
     * @notice insert bytes30 value to 30-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes30 to insert
     * @param offset slot offset in bits
     */
    function insertBytes30(Bytes32.Builder memory self, bytes30 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_30 << offset) | (bytes32(element) >> 16 << offset);
            if (self._size < 240 + offset) self._size = 240 + offset;
        }
    }

    /**
     * @notice insert bytes30 value to 30-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes30 to add
     */
    function pushBytes30(Bytes32.Builder memory self, bytes30 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 16 << self._size;
            self._size += 240;
        }
    }

    /**
     * @notice remove last 30-byte segment from bytes and return as bytes30
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes30 derived from bytes
     */
    function popBytes30(Bytes32.Builder memory self) internal pure returns (bytes30 element) {
        unchecked {
            self._size -= 240;
            bytes32 elementBytes = (self._data >> self._size) & MASK_30;
            element = bytes30(elementBytes << 16);
            self._data &= ~(MASK_30 << self._size);
        }
    }

    /**
     * @notice remove first 30-byte segment from bytes and return as bytes30
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes30 derived from bytes
     */
    function shiftBytes30(Bytes32.Builder memory self) internal pure returns (bytes30 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_30;
            element = bytes30(elementBytes << 16);
            self._data >>= 240;
            self._size -= 240;
        }
    }

    /**
     * @notice insert bytes30 value to 30-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes30 to add
     */
    function unshiftBytes30(Bytes32.Builder memory self, bytes30 element) internal pure {
        unchecked {
            self._data = (self._data << 240) | bytes32(element) >> 16;
            self._size += 240;
        }
    }
    /**
     * @notice parse int240 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int240 derived from bytes
     */
    function parseInt240(Bytes32.Builder memory self, uint256 offset) internal pure returns (int240 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_30;
        element = int240(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int240 value to 30-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int240 to insert
     * @param offset slot offset in bits
     */
    function insertInt240(Bytes32.Builder memory self, int240 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_30 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 16)) << offset);
            if (self._size < 240 + offset) self._size = 240 + offset;
        }
    }

    /**
     * @notice insert int240 value to 30-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int240 to add
     */
    function pushInt240(Bytes32.Builder memory self, int240 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 16)) << self._size;
            self._size += 240;
        }
    }

    /**
     * @notice remove last 30-byte segment from bytes and return as int240
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int240 derived from bytes
     */
    function popInt240(Bytes32.Builder memory self) internal pure returns (int240 element) {
        unchecked {
            self._size -= 240;
            bytes32 elementBytes = (self._data >> self._size) & MASK_30;
            element = int240(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_30 << self._size);
        }
    }

    /**
     * @notice remove first 30-byte segment from bytes and return as int240
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int240 derived from bytes
     */
    function shiftInt240(Bytes32.Builder memory self) internal pure returns (int240 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_30;
            element = int240(Bytes32.toInt256(elementBytes));
            self._data >>= 240;
            self._size -= 240;
        }
    }

    /**
     * @notice insert int240 value to 30-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int240 to add
     */
    function unshiftInt240(Bytes32.Builder memory self, int240 element) internal pure {
        unchecked {
            self._data = (self._data << 240) | (Int256.toBytes32(element) & (~bytes32(0) >> 16));
            self._size += 240;
        }
    }
    /**
     * @notice parse uint240 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint240 derived from bytes
     */
    function parseUint240(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint240 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_30;
        element = uint240(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint240 value to 30-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint240 to insert
     * @param offset slot offset in bits
     */
    function insertUint240(Bytes32.Builder memory self, uint240 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_30 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 240 + offset) self._size = 240 + offset;
        }
    }

    /**
     * @notice insert uint240 value to 30-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint240 to add
     */
    function pushUint240(Bytes32.Builder memory self, uint240 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 240;
        }
    }

    /**
     * @notice remove last 30-byte segment from bytes and return as uint240
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint240 derived from bytes
     */
    function popUint240(Bytes32.Builder memory self) internal pure returns (uint240 element) {
        unchecked {
            self._size -= 240;
            bytes32 elementBytes = (self._data >> self._size) & MASK_30;
            element = uint240(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_30 << self._size);
        }
    }

    /**
     * @notice remove first 30-byte segment from bytes and return as uint240
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint240 derived from bytes
     */
    function shiftUint240(Bytes32.Builder memory self) internal pure returns (uint240 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_30;
            element = uint240(Bytes32.toUint256(elementBytes));
            self._data >>= 240;
            self._size -= 240;
        }
    }

    /**
     * @notice insert uint240 value to 30-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint240 to add
     */
    function unshiftUint240(Bytes32.Builder memory self, uint240 element) internal pure {
        unchecked {
            self._data = (self._data << 240) | Uint256.toBytes32(element);
            self._size += 240;
        }
    }
    /**
     * @notice parse bytes31 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes31 derived from bytes
     */
    function parseBytes31(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes31 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_31;
        element = bytes31(elementBytes << 8);
    }

    /**
     * @notice insert bytes31 value to 31-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes31 to insert
     * @param offset slot offset in bits
     */
    function insertBytes31(Bytes32.Builder memory self, bytes31 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_31 << offset) | (bytes32(element) >> 8 << offset);
            if (self._size < 248 + offset) self._size = 248 + offset;
        }
    }

    /**
     * @notice insert bytes31 value to 31-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes31 to add
     */
    function pushBytes31(Bytes32.Builder memory self, bytes31 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 8 << self._size;
            self._size += 248;
        }
    }

    /**
     * @notice remove last 31-byte segment from bytes and return as bytes31
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes31 derived from bytes
     */
    function popBytes31(Bytes32.Builder memory self) internal pure returns (bytes31 element) {
        unchecked {
            self._size -= 248;
            bytes32 elementBytes = (self._data >> self._size) & MASK_31;
            element = bytes31(elementBytes << 8);
            self._data &= ~(MASK_31 << self._size);
        }
    }

    /**
     * @notice remove first 31-byte segment from bytes and return as bytes31
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes31 derived from bytes
     */
    function shiftBytes31(Bytes32.Builder memory self) internal pure returns (bytes31 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_31;
            element = bytes31(elementBytes << 8);
            self._data >>= 248;
            self._size -= 248;
        }
    }

    /**
     * @notice insert bytes31 value to 31-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes31 to add
     */
    function unshiftBytes31(Bytes32.Builder memory self, bytes31 element) internal pure {
        unchecked {
            self._data = (self._data << 248) | bytes32(element) >> 8;
            self._size += 248;
        }
    }
    /**
     * @notice parse int248 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int248 derived from bytes
     */
    function parseInt248(Bytes32.Builder memory self, uint256 offset) internal pure returns (int248 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_31;
        element = int248(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int248 value to 31-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int248 to insert
     * @param offset slot offset in bits
     */
    function insertInt248(Bytes32.Builder memory self, int248 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_31 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 8)) << offset);
            if (self._size < 248 + offset) self._size = 248 + offset;
        }
    }

    /**
     * @notice insert int248 value to 31-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int248 to add
     */
    function pushInt248(Bytes32.Builder memory self, int248 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 8)) << self._size;
            self._size += 248;
        }
    }

    /**
     * @notice remove last 31-byte segment from bytes and return as int248
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int248 derived from bytes
     */
    function popInt248(Bytes32.Builder memory self) internal pure returns (int248 element) {
        unchecked {
            self._size -= 248;
            bytes32 elementBytes = (self._data >> self._size) & MASK_31;
            element = int248(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_31 << self._size);
        }
    }

    /**
     * @notice remove first 31-byte segment from bytes and return as int248
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int248 derived from bytes
     */
    function shiftInt248(Bytes32.Builder memory self) internal pure returns (int248 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_31;
            element = int248(Bytes32.toInt256(elementBytes));
            self._data >>= 248;
            self._size -= 248;
        }
    }

    /**
     * @notice insert int248 value to 31-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int248 to add
     */
    function unshiftInt248(Bytes32.Builder memory self, int248 element) internal pure {
        unchecked {
            self._data = (self._data << 248) | (Int256.toBytes32(element) & (~bytes32(0) >> 8));
            self._size += 248;
        }
    }
    /**
     * @notice parse uint248 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint248 derived from bytes
     */
    function parseUint248(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint248 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_31;
        element = uint248(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint248 value to 31-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint248 to insert
     * @param offset slot offset in bits
     */
    function insertUint248(Bytes32.Builder memory self, uint248 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_31 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 248 + offset) self._size = 248 + offset;
        }
    }

    /**
     * @notice insert uint248 value to 31-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint248 to add
     */
    function pushUint248(Bytes32.Builder memory self, uint248 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 248;
        }
    }

    /**
     * @notice remove last 31-byte segment from bytes and return as uint248
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint248 derived from bytes
     */
    function popUint248(Bytes32.Builder memory self) internal pure returns (uint248 element) {
        unchecked {
            self._size -= 248;
            bytes32 elementBytes = (self._data >> self._size) & MASK_31;
            element = uint248(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_31 << self._size);
        }
    }

    /**
     * @notice remove first 31-byte segment from bytes and return as uint248
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint248 derived from bytes
     */
    function shiftUint248(Bytes32.Builder memory self) internal pure returns (uint248 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_31;
            element = uint248(Bytes32.toUint256(elementBytes));
            self._data >>= 248;
            self._size -= 248;
        }
    }

    /**
     * @notice insert uint248 value to 31-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint248 to add
     */
    function unshiftUint248(Bytes32.Builder memory self, uint248 element) internal pure {
        unchecked {
            self._data = (self._data << 248) | Uint256.toBytes32(element);
            self._size += 248;
        }
    }
    /**
     * @notice parse bytes32 from bytes at given offset
     * @param offset slot offset in bits
     * @return element bytes32 derived from bytes
     */
    function parseBytes32(Bytes32.Builder memory self, uint256 offset) internal pure returns (bytes32 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_32;
        element = bytes32(elementBytes << 0);
    }

    /**
     * @notice insert bytes32 value to 32-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes32 to insert
     * @param offset slot offset in bits
     */
    function insertBytes32(Bytes32.Builder memory self, bytes32 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_32 << offset) | (bytes32(element) >> 0 << offset);
            if (self._size < 256 + offset) self._size = 256 + offset;
        }
    }

    /**
     * @notice insert bytes32 value to 32-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes32 to add
     */
    function pushBytes32(Bytes32.Builder memory self, bytes32 element) internal pure {
        unchecked {
            self._data |= bytes32(element) >> 0 << self._size;
            self._size += 256;
        }
    }

    /**
     * @notice remove last 32-byte segment from bytes and return as bytes32
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes32 derived from bytes
     */
    function popBytes32(Bytes32.Builder memory self) internal pure returns (bytes32 element) {
        unchecked {
            self._size -= 256;
            bytes32 elementBytes = (self._data >> self._size) & MASK_32;
            element = bytes32(elementBytes << 0);
            self._data &= ~(MASK_32 << self._size);
        }
    }

    /**
     * @notice remove first 32-byte segment from bytes and return as bytes32
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element bytes32 derived from bytes
     */
    function shiftBytes32(Bytes32.Builder memory self) internal pure returns (bytes32 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_32;
            element = bytes32(elementBytes << 0);
            self._data >>= 256;
            self._size -= 256;
        }
    }

    /**
     * @notice insert bytes32 value to 32-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element bytes32 to add
     */
    function unshiftBytes32(Bytes32.Builder memory self, bytes32 element) internal pure {
        unchecked {
            self._data = (self._data << 256) | bytes32(element) >> 0;
            self._size += 256;
        }
    }
    /**
     * @notice parse int256 from bytes at given offset
     * @param offset slot offset in bits
     * @return element int256 derived from bytes
     */
    function parseInt256(Bytes32.Builder memory self, uint256 offset) internal pure returns (int256 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_32;
        element = int256(Bytes32.toInt256(elementBytes));
    }

    /**
     * @notice insert int256 value to 32-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int256 to insert
     * @param offset slot offset in bits
     */
    function insertInt256(Bytes32.Builder memory self, int256 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_32 << offset) | ((Int256.toBytes32(element) & (~bytes32(0) >> 0)) << offset);
            if (self._size < 256 + offset) self._size = 256 + offset;
        }
    }

    /**
     * @notice insert int256 value to 32-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int256 to add
     */
    function pushInt256(Bytes32.Builder memory self, int256 element) internal pure {
        unchecked {
            self._data |= (Int256.toBytes32(element) & (~bytes32(0) >> 0)) << self._size;
            self._size += 256;
        }
    }

    /**
     * @notice remove last 32-byte segment from bytes and return as int256
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int256 derived from bytes
     */
    function popInt256(Bytes32.Builder memory self) internal pure returns (int256 element) {
        unchecked {
            self._size -= 256;
            bytes32 elementBytes = (self._data >> self._size) & MASK_32;
            element = int256(Bytes32.toInt256(elementBytes));
            self._data &= ~(MASK_32 << self._size);
        }
    }

    /**
     * @notice remove first 32-byte segment from bytes and return as int256
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element int256 derived from bytes
     */
    function shiftInt256(Bytes32.Builder memory self) internal pure returns (int256 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_32;
            element = int256(Bytes32.toInt256(elementBytes));
            self._data >>= 256;
            self._size -= 256;
        }
    }

    /**
     * @notice insert int256 value to 32-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element int256 to add
     */
    function unshiftInt256(Bytes32.Builder memory self, int256 element) internal pure {
        unchecked {
            self._data = (self._data << 256) | (Int256.toBytes32(element) & (~bytes32(0) >> 0));
            self._size += 256;
        }
    }
    /**
     * @notice parse uint256 from bytes at given offset
     * @param offset slot offset in bits
     * @return element uint256 derived from bytes
     */
    function parseUint256(Bytes32.Builder memory self, uint256 offset) internal pure returns (uint256 element) {
        bytes32 elementBytes = (self._data >> offset) & MASK_32;
        element = uint256(Bytes32.toUint256(elementBytes));
    }

    /**
     * @notice insert uint256 value to 32-byte position at given offset
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint256 to insert
     * @param offset slot offset in bits
     */
    function insertUint256(Bytes32.Builder memory self, uint256 element, uint256 offset) internal pure {
        unchecked {
            self._data = self._data & ~(MASK_32 << offset) | (Uint256.toBytes32(element) << offset);
            if (self._size < 256 + offset) self._size = 256 + offset;
        }
    }

    /**
     * @notice insert uint256 value to 32-byte position at end of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint256 to add
     */
    function pushUint256(Bytes32.Builder memory self, uint256 element) internal pure {
        unchecked {
            self._data |= Uint256.toBytes32(element) << self._size;
            self._size += 256;
        }
    }

    /**
     * @notice remove last 32-byte segment from bytes and return as uint256
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint256 derived from bytes
     */
    function popUint256(Bytes32.Builder memory self) internal pure returns (uint256 element) {
        unchecked {
            self._size -= 256;
            bytes32 elementBytes = (self._data >> self._size) & MASK_32;
            element = uint256(Bytes32.toUint256(elementBytes));
            self._data &= ~(MASK_32 << self._size);
        }
    }

    /**
     * @notice remove first 32-byte segment from bytes and return as uint256
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @return element uint256 derived from bytes
     */
    function shiftUint256(Bytes32.Builder memory self) internal pure returns (uint256 element) {
        unchecked {
            bytes32 elementBytes = self._data & MASK_32;
            element = uint256(Bytes32.toUint256(elementBytes));
            self._data >>= 256;
            self._size -= 256;
        }
    }

    /**
     * @notice insert uint256 value to 32-byte position at beginning of bytes
     * @param self Bytes32Builder Bytes32.Builder struct on which to operate
     * @param element uint256 to add
     */
    function unshiftUint256(Bytes32.Builder memory self, uint256 element) internal pure {
        unchecked {
            self._data = (self._data << 256) | Uint256.toBytes32(element);
            self._size += 256;
        }
    }
}
