// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { timestamp as _timestamp } from './time/Timestamp.sol';

library Block {
    /**
     * @notice replacement for block.timestamp which returns the current time as a Timestamp type
     * @return blockTimestamp current timestamp
     */
    function timestamp() internal view returns (_timestamp blockTimestamp) {
        assembly {
            blockTimestamp := timestamp()
        }
    }
}
