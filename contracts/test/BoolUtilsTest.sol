// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { BoolUtils } from '../utils/BoolUtils.sol';

contract BoolUtilsTest {
    function sanitizeBytes32Test(
        bool input
    ) external pure returns (bytes32 output) {
        // contaminate the higher-order bits
        assembly {
            input := or(input, shl(1, not(1)))
        }

        output = BoolUtils.toBytes32(input);
    }
}
