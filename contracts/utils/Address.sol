// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { Uint256 } from './Uint256.sol';

library Address {
    using Uint256 for uint256;

    error Address__InsufficientBalance();
    error Address__NotContract();
    error Address__SendValueFailed();
    error Address__FailedCall();
    error Address__FailedCallWithValue();
    error Address__FailedDelegatecall();

    /**
     * @notice sanitize higher-order bits of address and convert to bytes32
     * @param account address to convert to bytes32
     * @return result bytes32 representation of address
     */
    function toBytes32(address account) internal pure returns (bytes32 result) {
        // sanitization is required because address(uint160([uint256 value])) cast does not sanitize
        assembly {
            result := and(account, shr(96, not(0)))
        }
    }

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
        if (!success) revert Address__SendValueFailed();
    }

    function functionCall(
        address target,
        bytes memory data
    ) internal returns (bytes memory) {
        return functionCall(target, data, Address__FailedCall.selector);
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
                Address__FailedCallWithValue.selector
            );
    }

    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value,
        bytes4 error
    ) internal returns (bytes memory) {
        if (value > address(this).balance)
            revert Address__InsufficientBalance();
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
                Address__FailedDelegatecall.selector
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
                add(data, 32),
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
            returndatacopy(add(returnData, 32), 0, toCopy)
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
            revert Address__NotContract();
    }
}
