// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Panic } from '../Panic.sol';
import { Duration, duration } from './Duration.sol';

// uint48 is safe for timestamps until 07 December 8,921,556 10:44:15 AM
type timestamp is uint48;

using {
    eq as ==,
    notEq as !=,
    gt as >,
    lt as <,
    gte as >=,
    lte as <=
} for timestamp global;

using Timestamp for timestamp global;

function eq(timestamp t0, timestamp t1) pure returns (bool status) {
    status = timestamp.unwrap(t0) == timestamp.unwrap(t1);
}

function notEq(timestamp t0, timestamp t1) pure returns (bool status) {
    status = timestamp.unwrap(t0) != timestamp.unwrap(t1);
}

function gt(timestamp t0, timestamp t1) pure returns (bool status) {
    status = timestamp.unwrap(t0) > timestamp.unwrap(t1);
}

function lt(timestamp t0, timestamp t1) pure returns (bool status) {
    status = timestamp.unwrap(t0) < timestamp.unwrap(t1);
}

function gte(timestamp t0, timestamp t1) pure returns (bool status) {
    status = timestamp.unwrap(t0) >= timestamp.unwrap(t1);
}

function lte(timestamp t0, timestamp t1) pure returns (bool status) {
    status = timestamp.unwrap(t0) <= timestamp.unwrap(t1);
}

library Timestamp {
    function fromUint256(
        uint256 value
    ) internal pure returns (timestamp result) {
        if (value > type(uint48).max) Panic.panic(Panic.ARITHMETIC_OVERFLOW);
        result = timestamp.wrap(uint48(value));
    }

    function add(
        timestamp t,
        duration d
    ) internal pure returns (timestamp result) {
        result = timestamp.wrap(timestamp.unwrap(t) + duration.unwrap(d));
    }

    function sub(
        timestamp t,
        duration d
    ) internal pure returns (timestamp result) {
        result = timestamp.wrap(timestamp.unwrap(t) - duration.unwrap(d));
    }

    function durationSince(
        timestamp t
    ) internal view returns (duration result) {
        result = Duration.fromUint256(block.timestamp - timestamp.unwrap(t));
    }
}
