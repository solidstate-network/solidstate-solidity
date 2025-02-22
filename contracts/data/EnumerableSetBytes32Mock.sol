// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { EnumerableSet } from './EnumerableSet.sol';

contract EnumerableSetBytes32Mock {
    using EnumerableSet for EnumerableSet.Bytes32Set;

    EnumerableSet.Bytes32Set internal bytes32Set;

    function at(uint256 index) external view returns (bytes32) {
        return bytes32Set.at(index);
    }

    function contains(bytes32 value) external view returns (bool) {
        return bytes32Set.contains(value);
    }

    function indexOf(bytes32 value) external view returns (uint256) {
        return bytes32Set.indexOf(value);
    }

    function length() external view returns (uint256) {
        return bytes32Set.length();
    }

    function add(bytes32 value) external returns (bool) {
        return bytes32Set.add(value);
    }

    function remove(bytes32 value) external returns (bool) {
        return bytes32Set.remove(value);
    }

    function toArray() external view returns (bytes32[] memory) {
        return bytes32Set.toArray();
    }
}
