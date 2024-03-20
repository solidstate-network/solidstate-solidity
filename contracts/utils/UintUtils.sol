// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

/**
 * @title utility functions for uint256 operations
 * @dev derived from https://github.com/OpenZeppelin/openzeppelin-contracts/ (MIT license)
 */
library UintUtils {
    error UintUtils__InsufficientPadding();
    error UintUtils__InvalidBase();

    bytes16 private constant HEX_SYMBOLS = '0123456789abcdef';

    function add(uint256 a, int256 b) internal pure returns (uint256) {
        return b < 0 ? sub(a, -b) : a + uint256(b);
    }

    function sub(uint256 a, int256 b) internal pure returns (uint256) {
        return b < 0 ? add(a, -b) : a - uint256(b);
    }

    /**
     * @notice output the string representation of a number in a given radix
     * @dev radix must be between 2 and 36 (inclusive)
     * @param value number to format as string
     * @param radix numerical base to use
     * @return output formatted string
     */
    function toString(
        uint256 value,
        uint256 radix
    ) internal pure returns (string memory output) {
        // this check is repeated in the internal call to #toString(uint256,uint256,uint256)
        // but is still needed here to avoid zero division (radix = 0) or infinite loop (radix = 1)
        if (radix < 2) {
            revert UintUtils__InvalidBase();
        }

        uint256 length;
        uint256 temp = value;

        do {
            unchecked {
                length++;
            }
            temp /= radix;
        } while (temp != 0);

        output = toString(value, radix, length);
    }

    /**
     * @notice output the string representation of a number in a given radix and padded to given length
     * @dev radix must be between 2 and 36 (inclusive)
     * @param value number to format as string
     * @param radix numerical base to use
     * @param length size to which output should be zero padded
     * @return output formatted string
     */
    function toString(
        uint256 value,
        uint256 radix,
        uint256 length
    ) internal pure returns (string memory output) {
        if (radix < 2 || radix > 36) {
            revert UintUtils__InvalidBase();
        }

        bytes memory buffer = new bytes(length);

        while (length != 0) {
            unchecked {
                length--;
            }

            uint256 char = value % radix;

            if (char < 10) {
                // for numeral characters, shift 48 places through ASCII character set
                // 48 can be added using bitwise-or because its binary is 00110000
                char |= 48;
            } else {
                // for alphabetical characters, shift 87 places through ASCII character set
                unchecked {
                    char += 87;
                }
            }

            buffer[length] = bytes1(uint8(char));
            value /= radix;
        }

        if (value != 0) revert UintUtils__InsufficientPadding();

        output = string(buffer);
    }

    /**
     * @notice output the 0b-prefixed binary string representation of a number
     * @param value number to format as string
     * @return output formatted string
     */
    function toBinString(
        uint256 value
    ) internal pure returns (string memory output) {
        uint256 length;
        uint256 temp = value;

        do {
            unchecked {
                length++;
            }
            temp >>= 1;
        } while (temp != 0);

        output = toBinString(value, length);
    }

    /**
     * @notice output the 0b-prefixed binary string representation of a number padded to given length
     * @param value number to format as string
     * @param length size to which output should be zero padded (not including prefix)
     * @return output formatted string
     */
    function toBinString(
        uint256 value,
        uint256 length
    ) internal pure returns (string memory output) {
        // add two to length for the leading "0b"
        length += 2;

        bytes memory buffer = new bytes(length);
        buffer[0] = '0';
        buffer[1] = 'b';

        while (length > 2) {
            unchecked {
                length--;
            }

            buffer[length] = HEX_SYMBOLS[value & 1];
            value >>= 1;
        }

        if (value != 0) revert UintUtils__InsufficientPadding();

        output = string(buffer);
    }

    /**
     * @notice output the 0o-prefixed octal string representation of a number
     * @param value number to format as string
     * @return output formatted string
     */
    function toOctString(
        uint256 value
    ) internal pure returns (string memory output) {
        uint256 length;
        uint256 temp = value;

        do {
            unchecked {
                length++;
            }
            temp >>= 3;
        } while (temp != 0);

        output = toOctString(value, length);
    }

    /**
     * @notice output the 0o-prefixed octal string representation of a number padded to given length
     * @param value number to format as string
     * @param length size to which output should be zero padded (not including prefix)
     * @return output formatted string
     */
    function toOctString(
        uint256 value,
        uint256 length
    ) internal pure returns (string memory output) {
        // add two to length for the leading "0o"
        length += 2;

        bytes memory buffer = new bytes(length);
        buffer[0] = '0';
        buffer[1] = 'o';

        while (length > 2) {
            unchecked {
                length--;
            }

            buffer[length] = HEX_SYMBOLS[value & 7];
            value >>= 3;
        }

        if (value != 0) revert UintUtils__InsufficientPadding();

        output = string(buffer);
    }

    /**
     * @notice output the decimal string representation of a number
     * @param value number to format as string
     * @return output formatted string
     */
    function toDecString(
        uint256 value
    ) internal pure returns (string memory output) {
        output = toString(value, 10);
    }

    /**
     * @notice output the decimal string representation of a number padded to given length
     * @param value number to format as string
     * @param length size to which output should be zero padded
     * @return output formatted string
     */
    function toDecString(
        uint256 value,
        uint256 length
    ) internal pure returns (string memory output) {
        output = toString(value, 10, length);
    }

    /**
     * @notice output the 0x-prefixed hexadecimal string representation of a number
     * @dev calculated string length will always be even to prevent splitting of bytes
     * @param value number to format as string
     * @return output formatted string
     */
    function toHexString(
        uint256 value
    ) internal pure returns (string memory output) {
        uint256 length;
        uint256 temp = value;

        do {
            unchecked {
                length++;
            }
            temp >>= 8;
        } while (temp != 0);

        output = toHexString(value, length);
    }

    /**
     * @notice output the 0x-prefixed hexadecimal string representation of a number padded to given length
     * @dev calculated string length will always be even to prevent splitting of bytes
     * @param value number to format as string
     * @param length size (in bytes) to which output should be zero padded (not including prefix)
     * @return output formatted string
     */
    function toHexString(
        uint256 value,
        uint256 length
    ) internal pure returns (string memory output) {
        // convert byte length to character length and add two to length for the leading "0x"
        unchecked {
            length = (length << 1) + 2;
        }

        bytes memory buffer = new bytes(length);
        buffer[0] = '0';
        buffer[1] = 'x';

        while (length > 2) {
            unchecked {
                length--;
            }

            buffer[length] = HEX_SYMBOLS[value & 15];
            value >>= 4;
        }

        if (value != 0) revert UintUtils__InsufficientPadding();

        output = string(buffer);
    }
}
