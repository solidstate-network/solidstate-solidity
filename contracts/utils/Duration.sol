// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

// uint48 is safe for durations of up to 8,919,586.9 years
type Duration is uint48;

using {
    eq as ==,
    notEq as !=,
    gt as >,
    lt as <,
    gte as >=,
    lte as <=,
    add as +,
    sub as -
} for Duration global;

function eq(Duration t0, Duration t1) pure returns (bool status) {
    status = Duration.unwrap(t0) == Duration.unwrap(t1);
}

function notEq(Duration t0, Duration t1) pure returns (bool status) {
    status = Duration.unwrap(t0) != Duration.unwrap(t1);
}

function gt(Duration t0, Duration t1) pure returns (bool status) {
    status = Duration.unwrap(t0) > Duration.unwrap(t1);
}

function lt(Duration t0, Duration t1) pure returns (bool status) {
    status = Duration.unwrap(t0) < Duration.unwrap(t1);
}

function gte(Duration t0, Duration t1) pure returns (bool status) {
    status = Duration.unwrap(t0) >= Duration.unwrap(t1);
}

function lte(Duration t0, Duration t1) pure returns (bool status) {
    status = Duration.unwrap(t0) <= Duration.unwrap(t1);
}

function add(Duration t0, Duration t1) pure returns (Duration duration) {
    duration = Duration.wrap(Duration.unwrap(t0) + Duration.unwrap(t1));
}

function sub(Duration t0, Duration t1) pure returns (Duration duration) {
    duration = Duration.wrap(Duration.unwrap(t0) - Duration.unwrap(t1));
}
