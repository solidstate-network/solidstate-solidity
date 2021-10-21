// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { UintUtils } from './UintUtils.sol';

contract UintUtilsMock {
    using UintUtils for uint256;

    function toString(uint256 number) external pure returns (string memory) {
        return number.toString();
    }
}
