// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { AddressUtils } from './AddressUtils.sol';

contract AddressUtilsMock {
    using AddressUtils for address;
    using AddressUtils for address payable;

    receive() external payable {}

    function toString(address account) external pure returns (string memory) {
        return account.toString();
    }

    function isContract(address account) external view returns (bool) {
        return account.isContract();
    }

    function sendValue(address payable account, uint256 amount) external {
        account.sendValue(amount);
    }

    function functionCall(address target, bytes memory data)
        external
        returns (bytes memory)
    {
        return target.functionCall(data);
    }

    function functionalCall(
        address target,
        bytes memory data,
        string memory error
    ) external returns (bytes memory) {
        return target.functionCall(data, error);
    }

    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value,
        string memory error
    ) external returns (bytes memory) {
        return target.functionCallWithValue(data, value, error);
    }
}
