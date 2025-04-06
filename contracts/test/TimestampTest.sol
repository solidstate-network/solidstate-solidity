// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { timestamp } from '../utils/Timestamp.sol';

contract TimestampTest {
    function eq(
        timestamp t0,
        timestamp t1
    ) external pure returns (bool status) {
        status = t0 == t1;
    }

    function notEq(
        timestamp t0,
        timestamp t1
    ) external pure returns (bool status) {
        status = t0 != t1;
    }

    function gt(
        timestamp t0,
        timestamp t1
    ) external pure returns (bool status) {
        status = t0 > t1;
    }

    function lt(
        timestamp t0,
        timestamp t1
    ) external pure returns (bool status) {
        status = t0 < t1;
    }

    function gte(
        timestamp t0,
        timestamp t1
    ) external pure returns (bool status) {
        status = t0 >= t1;
    }

    function lte(
        timestamp t0,
        timestamp t1
    ) external pure returns (bool status) {
        status = t0 <= t1;
    }
}
