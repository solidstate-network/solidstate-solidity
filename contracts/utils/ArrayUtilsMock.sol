// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ArrayUtils } from './ArrayUtils.sol';

contract ArrayUtilsMock {
    using ArrayUtils for bytes32[];
    using ArrayUtils for address[];
    using ArrayUtils for uint256[];

    function min(bytes32[] memory array) external pure returns (bytes32) {
        return array.min();
    }

    function min(address[] memory array) external pure returns (address) {
        return array.min();
    }

    function min(uint256[] memory array) external pure returns (uint256) {
        return array.min();
    }

    function max(bytes32[] memory array) external pure returns (bytes32) {
        return array.max();
    }

    function max(address[] memory array) external pure returns (address) {
        return array.max();
    }

    function max(uint256[] memory array) external pure returns (uint256) {
        return array.max();
    }
}
