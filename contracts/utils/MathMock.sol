// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Math } from './Math.sol';

contract MathMock {
    using Math for uint256;

    function abs(int256 a) external pure returns (uint256) {
        return Math.abs(a);
    }

    function max(uint256 a, uint256 b) external pure returns (uint256) {
        return Math.max(a, b);
    }

    function min(uint256 a, uint256 b) external pure returns (uint256) {
        return Math.min(a, b);
    }

    function average(uint256 a, uint256 b) external pure returns (uint256) {
        return Math.average(a, b);
    }

    function sqrt(uint256 x) external pure returns (uint256) {
        return x.sqrt();
    }
}
