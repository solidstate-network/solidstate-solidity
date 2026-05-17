// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { Bytes32 } from '../utils/Bytes32.sol';

contract Bytes32Test {
    function sanitizeAddressTest(
        address input
    ) external pure returns (bytes32 outputBytes32) {
        bytes32 inputBytes32;

        // contaminate the higher-order bits
        assembly {
            inputBytes32 := or(input, shl(160, not(1)))
        }

        address output = Bytes32.toAddress(inputBytes32);

        assembly {
            outputBytes32 := output
        }
    }

    function sanitizeBoolTest(
        bool input
    ) external pure returns (bytes32 outputBytes32) {
        bytes32 inputBytes32;

        // contaminate the higher-order bits
        assembly {
            inputBytes32 := or(input, shl(1, not(1)))
        }

        bool output = Bytes32.toBool(inputBytes32);

        assembly {
            outputBytes32 := output
        }
    }
}
