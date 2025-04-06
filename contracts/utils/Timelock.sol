// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Block } from './Block.sol';
import { duration } from './Duration.sol';
import { timestamp } from './Timestamp.sol';

type timelock is uint96;

using Timelock for timelock global;

library Timelock {
    error Timelock__Unlocked();
    error Timelock__Locked();

    function getStartTimestamp(
        timelock self
    ) internal pure returns (timestamp startTimestamp) {
        startTimestamp = timestamp.wrap(uint48(timelock.unwrap(self)));
    }

    function getEndTimestamp(
        timelock self
    ) internal pure returns (timestamp endTimestamp) {
        endTimestamp = timestamp.wrap(uint48(timelock.unwrap(self) >> 48));
    }

    function isLocked(timelock self) internal view returns (bool status) {
        timestamp current = Block.timestamp();
        status =
            current >= self.getStartTimestamp() &&
            current < self.getEndTimestamp();
    }

    function requireLocked(timelock self) internal view {
        if (!isLocked(self)) revert Timelock__Unlocked();
    }

    function requireUnlocked(timelock self) internal view {
        if (isLocked(self)) revert Timelock__Locked();
    }

    function create(
        duration lockDuration
    ) internal view returns (timelock lock) {
        lock = create(Block.timestamp(), lockDuration);
    }

    function create(
        duration startDelay,
        duration lockDuration
    ) internal view returns (timelock lock) {
        lock = create(Block.timestamp().add(startDelay), lockDuration);
    }

    function create(
        timestamp startTimestamp,
        duration lockDuration
    ) internal pure returns (timelock lock) {
        lock = create(startTimestamp, startTimestamp.add(lockDuration));
    }

    function create(
        timestamp startTimestamp,
        timestamp endTimestamp
    ) internal pure returns (timelock lock) {
        lock = timelock.wrap(
            (uint96(timestamp.unwrap(endTimestamp)) << 48) |
                timestamp.unwrap(startTimestamp)
        );
    }
}
