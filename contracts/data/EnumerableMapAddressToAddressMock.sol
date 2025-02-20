// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { EnumerableMap } from './EnumerableMap.sol';

contract EnumerableMapAddressToAddressMock {
    using EnumerableMap for EnumerableMap.AddressToAddressMap;

    EnumerableMap.AddressToAddressMap internal map;

    function at(uint256 index) external view returns (address, address) {
        return map.at(index);
    }

    function contains(address key) external view returns (bool) {
        return map.contains(key);
    }

    function length() external view returns (uint256) {
        return map.length();
    }

    function get(address key) external view returns (address) {
        return map.get(key);
    }

    function set(address key, address value) external returns (bool) {
        return map.set(key, value);
    }

    function remove(address key) external returns (bool) {
        return map.remove(key);
    }

    function toArray()
        external
        view
        returns (address[] memory keysOut, address[] memory valuesOut)
    {
        (keysOut, valuesOut) = map.toArray();
    }

    function keys() external view returns (address[] memory keysOut) {
        keysOut = map.keys();
    }

    function values() external view returns (address[] memory valuesOut) {
        valuesOut = map.values();
    }
}
