// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Timestamp } from './Timestamp.sol';

library Block {
    /**
     * @notice replacement for block.timestamp which returns the current time as a Timestamp type
     * @return blockTimestamp current timestamp
     */
    function timestamp() internal view returns (Timestamp blockTimestamp) {
        assembly {
            blockTimestamp := timestamp()
        }
    }
}
