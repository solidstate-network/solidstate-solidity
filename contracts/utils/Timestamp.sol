// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

// uint48 is safe for timestamps until 07 December 8,921,556 10:44:15 AM
type Timestamp is uint48;

using {
    eq as ==,
    notEq as !=,
    gt as >,
    lt as <,
    gte as >=,
    lte as <=
} for Timestamp global;

function eq(Timestamp t0, Timestamp t1) pure returns (bool status) {
    status = Timestamp.unwrap(t0) == Timestamp.unwrap(t1);
}

function notEq(Timestamp t0, Timestamp t1) pure returns (bool status) {
    status = Timestamp.unwrap(t0) != Timestamp.unwrap(t1);
}

function gt(Timestamp t0, Timestamp t1) pure returns (bool status) {
    status = Timestamp.unwrap(t0) > Timestamp.unwrap(t1);
}

function lt(Timestamp t0, Timestamp t1) pure returns (bool status) {
    status = Timestamp.unwrap(t0) < Timestamp.unwrap(t1);
}

function gte(Timestamp t0, Timestamp t1) pure returns (bool status) {
    status = Timestamp.unwrap(t0) >= Timestamp.unwrap(t1);
}

function lte(Timestamp t0, Timestamp t1) pure returns (bool status) {
    status = Timestamp.unwrap(t0) <= Timestamp.unwrap(t1);
}
