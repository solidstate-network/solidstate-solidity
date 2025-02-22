// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { EnumerableSet } from './EnumerableSet.sol';

contract EnumerableSetAddressMock {
    using EnumerableSet for EnumerableSet.AddressSet;

    EnumerableSet.AddressSet internal addressSet;

    function at(uint256 index) external view returns (address) {
        return addressSet.at(index);
    }

    function contains(address value) external view returns (bool) {
        return addressSet.contains(value);
    }

    function indexOf(address value) external view returns (uint256) {
        return addressSet.indexOf(value);
    }

    function length() external view returns (uint256) {
        return addressSet.length();
    }

    function add(address value) external returns (bool) {
        return addressSet.add(value);
    }

    function remove(address value) external returns (bool) {
        return addressSet.remove(value);
    }

    function toArray() external view returns (address[] memory) {
        return addressSet.toArray();
    }
}
