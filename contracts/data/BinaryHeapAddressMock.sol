// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { BinaryHeap } from './BinaryHeap.sol';

contract BinaryHeapAddressMock {
    using BinaryHeap for BinaryHeap.AddressHeap;

    BinaryHeap.AddressHeap internal addressHeap;

    function at(uint256 index) external view returns (address) {
        return addressHeap.at(index);
    }

    function contains(address value) external view returns (bool) {
        return addressHeap.contains(value);
    }

    function indexOf(address value) external view returns (uint256) {
        return addressHeap.indexOf(value);
    }

    function length() external view returns (uint256) {
        return addressHeap.length();
    }

    function root() external view returns (address) {
        return addressHeap.root();
    }

    function add(address value) external returns (bool) {
        return addressHeap.add(value);
    }

    function remove(address value) external returns (bool) {
        return addressHeap.remove(value);
    }

    function toArray() external view returns (address[] memory) {
        return addressHeap.toArray();
    }
}
