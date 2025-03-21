// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { UintUtils } from './UintUtils.sol';

library AddressUtils {
    using UintUtils for uint256;

    error AddressUtils__InsufficientBalance();
    error AddressUtils__NotContract();
    error AddressUtils__SendValueFailed();
    error AddressUtils__FailedCall();
    error AddressUtils__FailedCallWithValue();
    error AddressUtils__FailedDelegatecall();

    function toString(address account) internal pure returns (string memory) {
        return uint256(uint160(account)).toHexString(20);
    }

    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }

    function sendValue(address payable account, uint256 amount) internal {
        (bool success, ) = account.call{ value: amount }('');
        if (!success) revert AddressUtils__SendValueFailed();
    }

    function functionCall(
        address target,
        bytes memory data
    ) internal returns (bytes memory) {
        return functionCall(target, data, AddressUtils__FailedCall.selector);
    }

    function functionCall(
        address target,
        bytes memory data,
        bytes4 error
    ) internal returns (bytes memory) {
        return _functionCallWithValue(target, data, 0, error);
    }

    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value
    ) internal returns (bytes memory) {
        return
            functionCallWithValue(
                target,
                data,
                value,
                AddressUtils__FailedCallWithValue.selector
            );
    }

    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value,
        bytes4 error
    ) internal returns (bytes memory) {
        if (value > address(this).balance)
            revert AddressUtils__InsufficientBalance();
        return _functionCallWithValue(target, data, value, error);
    }

    function functionDelegateCall(
        address target,
        bytes memory data
    ) internal returns (bytes memory) {
        return
            functionDelegateCall(
                target,
                data,
                AddressUtils__FailedDelegatecall.selector
            );
    }

    function functionDelegateCall(
        address target,
        bytes memory data,
        bytes4 error
    ) internal returns (bytes memory) {
        (bool success, bytes memory returnData) = target.delegatecall(data);
        _verifyCallResultFromTarget(target, success, returnData, error);
        return returnData;
    }

    /**
     * @notice execute arbitrary external call with limited gas usage and amount of copied return data
     * @dev derived from https://github.com/nomad-xyz/ExcessivelySafeCall (MIT License)
     * @param target recipient of call
     * @param gasAmount gas allowance for call
     * @param value native token value to include in call
     * @param maxCopy maximum number of bytes to copy from return data
     * @param data encoded call data
     * @return success whether call is successful
     * @return returnData copied return data
     */
    function excessivelySafeCall(
        address target,
        uint256 gasAmount,
        uint256 value,
        uint16 maxCopy,
        bytes memory data
    ) internal returns (bool success, bytes memory returnData) {
        returnData = new bytes(maxCopy);

        assembly {
            // execute external call via assembly to avoid automatic copying of return data
            success := call(
                gasAmount,
                target,
                value,
                add(data, 0x20),
                mload(data),
                0,
                0
            )

            // determine whether to limit amount of data to copy
            let toCopy := returndatasize()

            if gt(toCopy, maxCopy) {
                toCopy := maxCopy
            }

            // store the length of the copied bytes
            mstore(returnData, toCopy)

            // copy the bytes from returndata[0:toCopy]
            returndatacopy(add(returnData, 0x20), 0, toCopy)
        }
    }

    function _functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value,
        bytes4 error
    ) private returns (bytes memory) {
        (bool success, bytes memory returnData) = target.call{ value: value }(
            data
        );
        _verifyCallResultFromTarget(target, success, returnData, error);
        return returnData;
    }

    function _verifyCallResultFromTarget(
        address target,
        bool success,
        bytes memory returnData,
        bytes4 error
    ) private view {
        if (!success) {
            if (returnData.length == 0) {
                assembly {
                    mstore(0, error)
                    revert(0, 4)
                }
            } else {
                assembly {
                    let returnData_size := mload(returnData)
                    revert(add(32, returnData), returnData_size)
                }
            }
        }

        // code check is only required if call is successful and without return data
        if (returnData.length == 0 && !isContract(target))
            revert AddressUtils__NotContract();
    }
}
