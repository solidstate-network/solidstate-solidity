// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _FungibleTokenSnapshot } from './_FungibleTokenSnapshot.sol';
import { IFungibleTokenSnapshot } from './IFungibleTokenSnapshot.sol';

/**
 * @title FungibleToken base implementation with support for token balance and supply snapshots
 */
abstract contract FungibleTokenSnapshot is
    IFungibleTokenSnapshot,
    _FungibleTokenSnapshot
{
    /**
     * @inheritdoc IFungibleTokenSnapshot
     */
    function balanceOfAt(
        address account,
        uint256 snapshotId
    ) external view returns (uint256 balance) {
        balance = _balanceOfAt(account, snapshotId);
    }

    /**
     * @inheritdoc IFungibleTokenSnapshot
     */
    function totalSupplyAt(
        uint256 snapshotId
    ) external view returns (uint256 totalSupply) {
        totalSupply = _totalSupplyAt(snapshotId);
    }
}
