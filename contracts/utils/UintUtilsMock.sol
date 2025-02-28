// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { UintUtils } from './UintUtils.sol';

contract UintUtilsMock {
    using UintUtils for uint256;

    function add(uint256 a, int256 b) external pure returns (uint256) {
        return a.add(b);
    }

    function sub(uint256 a, int256 b) external pure returns (uint256) {
        return a.sub(b);
    }

    function toString(
        uint256 number,
        uint256 radix
    ) external pure returns (string memory) {
        return number.toString(radix);
    }

    function toString(
        uint256 number,
        uint256 radix,
        uint256 length
    ) external pure returns (string memory) {
        return number.toString(radix, length);
    }

    function toBinString(uint256 number) external pure returns (string memory) {
        return number.toBinString();
    }

    function toBinString(
        uint256 number,
        uint256 length
    ) external pure returns (string memory) {
        return number.toBinString(length);
    }

    function toOctString(uint256 number) external pure returns (string memory) {
        return number.toOctString();
    }

    function toOctString(
        uint256 number,
        uint256 length
    ) external pure returns (string memory) {
        return number.toOctString(length);
    }

    function toDecString(uint256 number) external pure returns (string memory) {
        return number.toDecString();
    }

    function toDecString(
        uint256 number,
        uint256 length
    ) external pure returns (string memory) {
        return number.toDecString(length);
    }

    function toHexString(uint256 value) external pure returns (string memory) {
        return value.toHexString();
    }

    function toHexString(
        uint256 value,
        uint256 length
    ) external pure returns (string memory) {
        return value.toHexString(length);
    }
}
