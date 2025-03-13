// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IMultiTokenBase } from '../base/IMultiTokenBase.sol';
import { _IMultiTokenEnumerable } from './_IMultiTokenEnumerable.sol';

/**
 * @title MultiToken enumerable and aggregate function interface
 */
interface IMultiTokenEnumerable is _IMultiTokenEnumerable, IMultiTokenBase {
    /**
     * @notice query total minted supply of given token
     * @param id token id to query
     * @return token supply
     */
    function totalSupply(uint256 id) external view returns (uint256);

    /**
     * @notice query total number of holders for given token
     * @param id token id to query
     * @return quantity of holders
     */
    function totalHolders(uint256 id) external view returns (uint256);

    /**
     * @notice query holders of given token
     * @param id token id to query
     * @return list of holder addresses
     */
    function accountsByToken(
        uint256 id
    ) external view returns (address[] memory);

    /**
     * @notice query tokens held by given address
     * @param account address to query
     * @return list of token ids
     */
    function tokensByAccount(
        address account
    ) external view returns (uint256[] memory);
}
