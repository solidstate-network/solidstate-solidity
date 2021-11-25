// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { Math } from './Math.sol';

contract MathMock {
    using Math for uint256;

    function average(uint256 _a, uint256 _b) external pure returns (uint256) {
        return _a.average(_b);
    }

    function sqrt(uint256 _x) external pure returns (uint256) {
        return _x.sqrt();
    }
}
