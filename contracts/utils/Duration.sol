// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

// uint48 is safe for durations of up to 8,919,586.9 years
type duration is uint48;

using {
    eq as ==,
    notEq as !=,
    gt as >,
    lt as <,
    gte as >=,
    lte as <=,
    add as +,
    sub as -
} for duration global;

using Duration for duration global;

function eq(duration d0, duration d1) pure returns (bool status) {
    status = duration.unwrap(d0) == duration.unwrap(d1);
}

function notEq(duration d0, duration d1) pure returns (bool status) {
    status = duration.unwrap(d0) != duration.unwrap(d1);
}

function gt(duration d0, duration d1) pure returns (bool status) {
    status = duration.unwrap(d0) > duration.unwrap(d1);
}

function lt(duration d0, duration d1) pure returns (bool status) {
    status = duration.unwrap(d0) < duration.unwrap(d1);
}

function gte(duration d0, duration d1) pure returns (bool status) {
    status = duration.unwrap(d0) >= duration.unwrap(d1);
}

function lte(duration d0, duration d1) pure returns (bool status) {
    status = duration.unwrap(d0) <= duration.unwrap(d1);
}

function add(duration d0, duration d1) pure returns (duration result) {
    result = duration.wrap(duration.unwrap(d0) + duration.unwrap(d1));
}

function sub(duration d0, duration d1) pure returns (duration result) {
    result = duration.wrap(duration.unwrap(d0) - duration.unwrap(d1));
}

library Duration {
    function fromUint256(
        uint256 value
    ) internal pure returns (duration result) {
        result = duration.wrap(uint48(value));
    }

    function ofSeconds(
        uint256 quantity
    ) internal pure returns (duration result) {
        result = fromUint256(quantity * 1 seconds);
    }

    function ofMinutes(
        uint256 quantity
    ) internal pure returns (duration result) {
        result = fromUint256(quantity * 1 minutes);
    }

    function ofHours(uint256 quantity) internal pure returns (duration result) {
        result = fromUint256(quantity * 1 hours);
    }

    function ofDays(uint256 quantity) internal pure returns (duration result) {
        result = fromUint256(quantity * 1 days);
    }

    function ofWeeks(uint256 quantity) internal pure returns (duration result) {
        result = fromUint256(quantity * 1 weeks);
    }
}
