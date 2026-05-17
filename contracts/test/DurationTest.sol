// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { duration } from '../utils/time/Duration.sol';

contract DurationTest {
    function eq(duration d0, duration d1) external pure returns (bool status) {
        status = d0 == d1;
    }

    function notEq(
        duration d0,
        duration d1
    ) external pure returns (bool status) {
        status = d0 != d1;
    }

    function gt(duration d0, duration d1) external pure returns (bool status) {
        status = d0 > d1;
    }

    function lt(duration d0, duration d1) external pure returns (bool status) {
        status = d0 < d1;
    }

    function gte(duration d0, duration d1) external pure returns (bool status) {
        status = d0 >= d1;
    }

    function lte(duration d0, duration d1) external pure returns (bool status) {
        status = d0 <= d1;
    }

    function add(
        duration d0,
        duration d1
    ) external pure returns (duration result) {
        result = d0 + d1;
    }

    function sub(
        duration d0,
        duration d1
    ) external pure returns (duration result) {
        result = d0 - d1;
    }
}
