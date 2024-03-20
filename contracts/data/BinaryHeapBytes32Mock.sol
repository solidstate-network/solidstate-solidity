// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { BinaryHeap } from './BinaryHeap.sol';

contract BinaryHeapBytes32Mock {
    using BinaryHeap for BinaryHeap.Bytes32Heap;

    BinaryHeap.Bytes32Heap internal bytes32Heap;

    function at(uint256 index) external view returns (bytes32) {
        return bytes32Heap.at(index);
    }

    function contains(bytes32 value) external view returns (bool) {
        return bytes32Heap.contains(value);
    }

    function indexOf(bytes32 value) external view returns (uint256) {
        return bytes32Heap.indexOf(value);
    }

    function length() external view returns (uint256) {
        return bytes32Heap.length();
    }

    function root() external view returns (bytes32) {
        return bytes32Heap.root();
    }

    function add(bytes32 value) external returns (bool) {
        return bytes32Heap.add(value);
    }

    function remove(bytes32 value) external returns (bool) {
        return bytes32Heap.remove(value);
    }

    function toArray() external view returns (bytes32[] memory) {
        return bytes32Heap.toArray();
    }
}
