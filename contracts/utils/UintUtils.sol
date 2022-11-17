// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

/**
 * @title utility functions for uint256 operations
 * @dev derived from https://github.com/OpenZeppelin/openzeppelin-contracts/ (MIT license)
 */
library UintUtils {
    error UintUtils__InsufficientPadding();

    bytes16 private constant HEX_SYMBOLS = '0123456789abcdef';

    function add(uint256 a, int256 b) internal pure returns (uint256) {
        return b < 0 ? sub(a, -b) : a + uint256(b);
    }

    function sub(uint256 a, int256 b) internal pure returns (uint256) {
        return b < 0 ? add(a, -b) : a - uint256(b);
    }

    function toString(uint256 value, uint256 base)
        internal
        pure
        returns (string memory)
    {
        if (value == 0) {
            return '0';
        }

        uint256 length;

        for (uint256 temp = value; temp != 0; temp /= base) {
            unchecked {
                length++;
            }
        }

        return toString(value, base, length);
    }

    function toString(
        uint256 value,
        uint256 base,
        uint256 length
    ) internal pure returns (string memory) {
        bytes memory buffer = new bytes(length);

        while (length > 0) {
            unchecked {
                length--;
            }

            // 48 can be added using bitwise-or because its binary is 00110000
            buffer[length] = bytes1(uint8(value % base | 48));
            value /= base;
        }

        if (value != 0) revert UintUtils__InsufficientPadding();

        return string(buffer);
    }

    function toBinString(uint256 value) internal pure returns (string memory) {
        return toString(value, 2);
    }

    function toBinString(uint256 value, uint256 length)
        internal
        pure
        returns (string memory)
    {
        return toString(value, 2, length);
    }

    function toDecString(uint256 value) internal pure returns (string memory) {
        return toString(value, 10);
    }

    function toDecString(uint256 value, uint256 length)
        internal
        pure
        returns (string memory)
    {
        return toString(value, 10, length);
    }

    function toHexString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return '0x00';
        }

        uint256 length;

        for (uint256 temp = value; temp != 0; temp >>= 8) {
            unchecked {
                length += 2;
            }
        }

        return toHexString(value, length);
    }

    function toHexString(uint256 value, uint256 length)
        internal
        pure
        returns (string memory)
    {
        // add two to length for the leading "0x"
        length += 2;

        bytes memory buffer = new bytes(length);
        buffer[0] = '0';
        buffer[1] = 'x';

        while (length > 2) {
            unchecked {
                length--;
            }

            buffer[length] = HEX_SYMBOLS[value & 0xf];
            value >>= 4;
        }

        if (value != 0) revert UintUtils__InsufficientPadding();

        return string(buffer);
    }
}
