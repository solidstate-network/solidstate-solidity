// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC20Snapshot } from './IERC20Snapshot.sol';
import { _ERC20Snapshot } from './_ERC20Snapshot.sol';

/**
 * @title ERC20 base implementation with support for token balance and supply snapshots
 */
abstract contract ERC20Snapshot is IERC20Snapshot, _ERC20Snapshot {
    /**
     * @inheritdoc IERC20Snapshot
     */
    function balanceOfAt(
        address account,
        uint256 snapshotId
    ) external view returns (uint256 balance) {
        balance = _balanceOfAt(account, snapshotId);
    }

    /**
     * @inheritdoc IERC20Snapshot
     */
    function totalSupplyAt(
        uint256 snapshotId
    ) external view returns (uint256 totalSupply) {
        totalSupply = _totalSupplyAt(snapshotId);
    }
}
