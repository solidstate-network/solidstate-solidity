// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC20Snapshot } from './_IERC20Snapshot.sol';

interface IERC20Snapshot is _IERC20Snapshot {
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
