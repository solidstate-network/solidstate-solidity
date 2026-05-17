// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { Bool } from '../utils/Bool.sol';

contract BoolTest {
    function sanitizeBytes32Test(
        bool input
    ) external pure returns (bytes32 output) {
        // contaminate the higher-order bits
        assembly {
            input := or(input, shl(1, not(1)))
        }

        output = Bool.toBytes32(input);
    }

    function sanitizeUint256Test(
        bool input
    ) external pure returns (uint256 output) {
        // contaminate the higher-order bits
        assembly {
            input := or(input, shl(1, not(1)))
        }

        output = Bool.toUint256(input);
    }
}
