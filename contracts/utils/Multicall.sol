// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { IMulticall } from './IMulticall.sol';

/**
 * @title Utility contract for supporting processing of multiple function calls in a single transaction
 */
abstract contract Multicall is IMulticall {
    /**
     * @inheritdoc IMulticall
     */
    function multicall(bytes[] calldata data)
        external
        override
        returns (bytes[] memory results)
    {
        results = new bytes[](data.length);

        for (uint256 i; i < data.length; i++) {
            (bool success, bytes memory returndata) = address(this)
                .delegatecall(data[i]);

            if (success) {
                results[i] = returndata;
            } else {
                assembly {
                    returndatacopy(0, 0, returndatasize())
                    revert(0, returndatasize())
                }
            }
        }

        return results;
    }
}
