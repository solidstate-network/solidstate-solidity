// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { DoublyLinkedList } from './DoublyLinkedList.sol';

contract DoublyLinkedListBytes32Mock {
    using DoublyLinkedList for DoublyLinkedList.Bytes32List;

    DoublyLinkedList.Bytes32List private self;

    function contains(bytes32 value) external view returns (bool) {
        return self.contains(value);
    }

    function prev(bytes32 value) external view returns (bytes32) {
        return self.prev(value);
    }

    function next(bytes32 value) external view returns (bytes32) {
        return self.next(value);
    }

    function insertBefore(
        bytes32 nextValue,
        bytes32 newValue
    ) external returns (bool) {
        return self.insertBefore(nextValue, newValue);
    }

    function insertAfter(
        bytes32 prevValue,
        bytes32 newValue
    ) external returns (bool) {
        return self.insertAfter(prevValue, newValue);
    }

    function push(bytes32 value) external returns (bool) {
        return self.push(value);
    }

    function pop() external returns (bytes32) {
        return self.pop();
    }

    function shift() external returns (bytes32) {
        return self.shift();
    }

    function unshift(bytes32 value) external returns (bool) {
        return self.unshift(value);
    }

    function remove(bytes32 value) external returns (bool) {
        return self.remove(value);
    }

    function replace(
        bytes32 oldValue,
        bytes32 newValue
    ) external returns (bool) {
        return self.replace(oldValue, newValue);
    }
}
