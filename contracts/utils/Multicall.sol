// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IMulticall } from './IMulticall.sol';
import { _Multicall } from './_Multicall.sol';

/**
 * @title Utility contract for supporting processing of multiple function calls in a single transaction
 */
abstract contract Multicall is IMulticall, _Multicall {
    /**
     * @inheritdoc IMulticall
     */
    function multicall(
        bytes[] calldata data
    ) external returns (bytes[] memory results) {
        results = _multicall(data);
    }
}
