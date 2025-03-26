// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Address } from '../utils/Address.sol';

contract AddressTest {
    function sanitizeBytes32Test(
        address input
    ) external pure returns (bytes32 output) {
        // contaminate the higher-order bits
        assembly {
            input := or(input, shl(160, not(1)))
        }

        output = Address.toBytes32(input);
    }
}
