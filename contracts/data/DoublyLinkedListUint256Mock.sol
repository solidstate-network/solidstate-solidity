// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { DoublyLinkedList } from './DoublyLinkedList.sol';

contract DoublyLinkedListUint256Mock {
    using DoublyLinkedList for DoublyLinkedList.Uint256List;

    DoublyLinkedList.Uint256List private self;

    function contains(uint256 value) external view returns (bool) {
        return self.contains(value);
    }

    function prev(uint256 value) external view returns (uint256) {
        return self.prev(value);
    }

    function next(uint256 value) external view returns (uint256) {
        return self.next(value);
    }

    function insertBefore(
        uint256 nextValue,
        uint256 newValue
    ) external returns (bool) {
        return self.insertBefore(nextValue, newValue);
    }

    function insertAfter(
        uint256 prevValue,
        uint256 newValue
    ) external returns (bool) {
        return self.insertAfter(prevValue, newValue);
    }

    function push(uint256 value) external returns (bool) {
        return self.push(value);
    }

    function pop() external returns (uint256) {
        return self.pop();
    }

    function shift() external returns (uint256) {
        return self.shift();
    }

    function unshift(uint256 value) external returns (bool) {
        return self.unshift(value);
    }

    function remove(uint256 value) external returns (bool) {
        return self.remove(value);
    }

    function replace(
        uint256 oldValue,
        uint256 newValue
    ) external returns (bool) {
        return self.replace(oldValue, newValue);
    }
}
