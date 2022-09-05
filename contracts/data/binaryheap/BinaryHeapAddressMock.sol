// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { BinaryHeap } from './BinaryHeap.sol';

contract BinaryHeapAddressMock {
    using BinaryHeap for BinaryHeap.AddressHeap;

    BinaryHeap.AddressHeap internal addressHeap;

    function heap() external view returns (address[] memory) {
        uint256 l = addressHeap.length();
        address[] memory arr = new address[](l);
        for (uint256 i = 0; i < l; i++) {
            arr[i] = addressHeap.at(i);
        }
        return arr;
    }

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

    function add(address value) external {
        addressHeap.add(value);
    }

    function remove(address value) external returns (bool) {
        return addressHeap.remove(value);
    }
}
