// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Bytes32Utils } from '../utils/Bytes32Utils.sol';

contract Bytes32UtilsTest {
    function sanitizeAddressTest(
        address input
    ) external pure returns (bytes32 outputBytes32) {
        bytes32 inputBytes32;

        // contaminate the higher-order bits
        assembly {
            inputBytes32 := or(input, shl(160, not(1)))
        }

        address output = Bytes32Utils.toAddress(inputBytes32);

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

        bool output = Bytes32Utils.toBool(inputBytes32);

        assembly {
            outputBytes32 := output
        }
    }
}
