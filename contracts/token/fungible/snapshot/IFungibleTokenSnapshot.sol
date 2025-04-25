// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IFungibleTokenSnapshot } from './_IFungibleTokenSnapshot.sol';

interface IFungibleTokenSnapshot is _IFungibleTokenSnapshot {
    /**
     * @notice query the token balance of given account at given snapshot id
     * @param account address to query
     * @param snapshotId snapshot id to query
     * @return balance token balance
     */
    function balanceOfAt(
        address account,
        uint256 snapshotId
    ) external view returns (uint256 balance);

    /**
     * @notice query the total minted token supply at given snapshot id
     * @param snapshotId snapshot id to query
     * @return totalSupply token supply
     */
    function totalSupplyAt(
        uint256 snapshotId
    ) external view returns (uint256 totalSupply);
}
