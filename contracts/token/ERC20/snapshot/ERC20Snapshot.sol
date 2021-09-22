// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { Array } from '../../../utils/Array.sol';
import { ERC20SnapshotInternal, ERC20SnapshotStorage } from './ERC20SnapshotInternal.sol';

/**
 * @title ERC20 base implementation with support for token balance and supply snapshots
 */
abstract contract ERC20Snapshot is ERC20SnapshotInternal {
    using Array for uint256[];

    /**
     * @notice query the token balance of given account at given snapshot id
     * @param account address to query
     * @param snapshotId snapshot id to query
     * @return token balance
     */
    function balanceOfAt(address account, uint256 snapshotId)
        public
        view
        returns (uint256)
    {
        (bool snapshotted, uint256 value) = _valueAt(
            snapshotId,
            ERC20SnapshotStorage.layout().accountBalanceSnapshots[account]
        );
        return snapshotted ? value : _balanceOf(account);
    }

    /**
     * @notice query the total minted token supply at given snapshot id
     * @param snapshotId snapshot id to query
     * @return token supply
     */
    function totalSupplyAt(uint256 snapshotId) public view returns (uint256) {
        (bool snapshotted, uint256 value) = _valueAt(
            snapshotId,
            ERC20SnapshotStorage.layout().totalSupplySnapshots
        );
        return snapshotted ? value : _totalSupply();
    }

    function _valueAt(
        uint256 snapshotId,
        ERC20SnapshotStorage.Snapshots storage snapshots
    ) private view returns (bool, uint256) {
        require(snapshotId > 0, 'ERC20Snapshot: snapshot id must not be zero');
        ERC20SnapshotStorage.Layout storage l = ERC20SnapshotStorage.layout();

        require(
            snapshotId <= l.snapshotId,
            'ERC20Snapshot: snapshot id does not exist'
        );

        uint256 index = snapshots.ids.findUpperBound(snapshotId);

        if (index == snapshots.ids.length) {
            return (false, 0);
        } else {
            return (true, snapshots.values[index]);
        }
    }
}
