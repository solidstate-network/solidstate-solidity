// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { ArrayUtils } from './ArrayUtils.sol';

contract ArrayUtilsMock {
    using ArrayUtils for address[];
    using ArrayUtils for uint256[];

    function min(address[] memory array) external view returns (address) {
        return array.min();
    }

    function min(uint256[] memory array) external view returns (uint256) {
        return array.min();
    }

    function max(address[] memory array) external view returns (address) {
        return array.max();
    }

    function max(uint256[] memory array) external view returns (uint256) {
        return array.max();
    }
}
