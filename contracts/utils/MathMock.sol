// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { Math } from './Math.sol';

contract MathMock {
    using Math for uint256;

    function average(uint256 a, uint256 b) external pure returns (uint256) {
        return a.average(b);
    }

    function sqrt(uint256 x) external pure returns (uint256) {
        return x.sqrt();
    }
}
