// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { Bool } from '../utils/Bool.sol';

library Math {
    function add(uint256 a, int256 b) internal pure returns (uint256) {
        return b < 0 ? sub(a, -b) : a + uint256(b);
    }

    function sub(uint256 a, int256 b) internal pure returns (uint256) {
        return b < 0 ? add(a, -b) : a - uint256(b);
    }

    /**
     * @notice calculate the absolute value of a number
     * @param a number whose absolute value to calculate
     * @return absolute value
     */
    function abs(int256 a) internal pure returns (uint256) {
        return uint256(a < 0 ? -a : a);
    }

    /**
     * @notice select the greater of two numbers
     * @param a first number
     * @param b second number
     * @return greater number
     */
    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a > b ? a : b;
    }

    /**
     * @notice select the lesser of two numbers
     * @param a first number
     * @param b second number
     * @return lesser number
     */
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a > b ? b : a;
    }

    /**
     * @notice calculate the average of two numbers, rounded down
     * @dev derived from https://github.com/OpenZeppelin/openzeppelin-contracts (MIT license)
     * @param a first number
     * @param b second number
     * @return mean value
     */
    function average(uint256 a, uint256 b) internal pure returns (uint256) {
        unchecked {
            return (a & b) + ((a ^ b) >> 1);
        }
    }

    /**
     * @notice estimate square root of number
     * @dev uses Heron's method (https://en.wikipedia.org/wiki/Methods_of_computing_square_roots#Heron's_method)
     * @param n input number
     * @return root square root of input (rounded down to nearest uint256)
     */
    function sqrt(uint256 n) internal pure returns (uint256 root) {
        unchecked {
            // begin with an upper bound, to be updated each time a better estimate is found
            // for inputs of 0 and 1, this will be returned as-is
            root = n;
            // calculate an overestimate
            // bitwise-or prevents zero division in the case of input of 1
            uint256 estimate = (n >> 1) | 1;

            // as long as estimate continues to decrease, it is converging on the square root

            while (estimate < root) {
                // track the new best estimate as the prospective output value
                root = estimate;
                // attempt to find a better estimate
                estimate = (root + n / root) >> 1;
            }
        }
    }

    /**
     * @notice calculate the log base 2 of a number
     * @dev derived from https://github.com/OpenZeppelin/openzeppelin-contracts (MIT license)
     * @dev returns 0 for input of 0
     * @param x number whose log base 2 to calculate
     * @return result log base 2
     */
    function log2(uint256 x) internal pure returns (uint256 result) {
        // If value has upper 128 bits set, log2 result is at least 128
        result = Bool.toUint256(x > 0xffffffffffffffffffffffffffffffff) << 7;
        // If upper 64 bits of 128-bit half set, add 64 to result
        result |= Bool.toUint256((x >> result) > 0xffffffffffffffff) << 6;
        // If upper 32 bits of 64-bit half set, add 32 to result
        result |= Bool.toUint256((x >> result) > 0xffffffff) << 5;
        // If upper 16 bits of 32-bit half set, add 16 to result
        result |= Bool.toUint256((x >> result) > 0xffff) << 4;
        // If upper 8 bits of 16-bit half set, add 8 to result
        result |= Bool.toUint256((x >> result) > 0xff) << 3;
        // If upper 4 bits of 8-bit half set, add 4 to result
        result |= Bool.toUint256((x >> result) > 0xf) << 2;

        // Shifts value right by the current result and use it as an index into this lookup table:
        //
        // | x (4 bits) |  index  | table[index] = MSB position |
        // |------------|---------|-----------------------------|
        // |    0000    |    0    |        table[0] = 0         |
        // |    0001    |    1    |        table[1] = 0         |
        // |    0010    |    2    |        table[2] = 1         |
        // |    0011    |    3    |        table[3] = 1         |
        // |    0100    |    4    |        table[4] = 2         |
        // |    0101    |    5    |        table[5] = 2         |
        // |    0110    |    6    |        table[6] = 2         |
        // |    0111    |    7    |        table[7] = 2         |
        // |    1000    |    8    |        table[8] = 3         |
        // |    1001    |    9    |        table[9] = 3         |
        // |    1010    |   10    |        table[10] = 3        |
        // |    1011    |   11    |        table[11] = 3        |
        // |    1100    |   12    |        table[12] = 3        |
        // |    1101    |   13    |        table[13] = 3        |
        // |    1110    |   14    |        table[14] = 3        |
        // |    1111    |   15    |        table[15] = 3        |
        //
        // The lookup table is represented as a 32-byte value with the MSB positions for 0-15 in the last 16 bytes.
        assembly ('memory-safe') {
            result := or(
                result,
                byte(
                    shr(result, x),
                    0x0000010102020202030303030303030300000000000000000000000000000000
                )
            )
        }
    }
}
