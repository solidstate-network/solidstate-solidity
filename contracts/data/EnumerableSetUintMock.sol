// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { EnumerableSet } from './EnumerableSet.sol';

contract EnumerableSetUintMock {
    using EnumerableSet for EnumerableSet.UintSet;

    EnumerableSet.UintSet internal uintSet;

    function at(uint256 index) external view returns (uint256) {
        return uintSet.at(index);
    }

    function contains(uint256 value) external view returns (bool) {
        return uintSet.contains(value);
    }

    function indexOf(uint256 value) external view returns (uint256) {
        return uintSet.indexOf(value);
    }

    function length() external view returns (uint256) {
        return uintSet.length();
    }

    function add(uint256 value) external returns (bool) {
        return uintSet.add(value);
    }

    function remove(uint256 value) external returns (bool) {
        return uintSet.remove(value);
    }

    function toArray() external view returns (uint256[] memory) {
        return uintSet.toArray();
    }
}
