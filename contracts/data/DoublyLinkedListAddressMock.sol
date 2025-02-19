// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { DoublyLinkedList } from './DoublyLinkedList.sol';

contract DoublyLinkedListAddressMock {
    using DoublyLinkedList for DoublyLinkedList.AddressList;

    DoublyLinkedList.AddressList private self;

    function contains(address value) external view returns (bool) {
        return self.contains(value);
    }

    function prev(address value) external view returns (address) {
        return self.prev(value);
    }

    function next(address value) external view returns (address) {
        return self.next(value);
    }

    function insertBefore(
        address nextValue,
        address newValue
    ) external returns (bool) {
        return self.insertBefore(nextValue, newValue);
    }

    function insertAfter(
        address prevValue,
        address newValue
    ) external returns (bool) {
        return self.insertAfter(prevValue, newValue);
    }

    function push(address value) external returns (bool) {
        return self.push(value);
    }

    function pop() external returns (address) {
        return self.pop();
    }

    function shift() external returns (address) {
        return self.shift();
    }

    function unshift(address value) external returns (bool) {
        return self.unshift(value);
    }

    function remove(address value) external returns (bool) {
        return self.remove(value);
    }

    function replace(
        address oldValue,
        address newValue
    ) external returns (bool) {
        return self.replace(oldValue, newValue);
    }
}
