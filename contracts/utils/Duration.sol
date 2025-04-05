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

function eq(Duration d0, Duration d1) pure returns (bool status) {
    status = Duration.unwrap(d0) == Duration.unwrap(d1);
}

function notEq(Duration d0, Duration d1) pure returns (bool status) {
    status = Duration.unwrap(d0) != Duration.unwrap(d1);
}

function gt(Duration d0, Duration d1) pure returns (bool status) {
    status = Duration.unwrap(d0) > Duration.unwrap(d1);
}

function lt(Duration d0, Duration d1) pure returns (bool status) {
    status = Duration.unwrap(d0) < Duration.unwrap(d1);
}

function gte(Duration d0, Duration d1) pure returns (bool status) {
    status = Duration.unwrap(d0) >= Duration.unwrap(d1);
}

function lte(Duration d0, Duration d1) pure returns (bool status) {
    status = Duration.unwrap(d0) <= Duration.unwrap(d1);
}

function add(Duration d0, Duration d1) pure returns (Duration duration) {
    duration = Duration.wrap(Duration.unwrap(d0) + Duration.unwrap(d1));
}

function sub(Duration d0, Duration d1) pure returns (Duration duration) {
    duration = Duration.wrap(Duration.unwrap(d0) - Duration.unwrap(d1));
}
