// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IMulticall } from './_IMulticall.sol';

/**
 * @title Interface for the Multicall utility contract
 */
interface IMulticall is _IMulticall {
    /**
     * @notice batch function calls to the contract and return the results of each
     * @param data array of function call data payloads
     * @return results array of function call results
     */
    function multicall(
        bytes[] calldata data
    ) external returns (bytes[] memory results);
}
