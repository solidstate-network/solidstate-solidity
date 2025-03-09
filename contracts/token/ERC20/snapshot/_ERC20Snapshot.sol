// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Math } from '../../../utils/Math.sol';
import { _ERC20Base } from '../base/_ERC20Base.sol';
import { _IERC20Snapshot } from './_IERC20Snapshot.sol';
import { ERC20SnapshotStorage } from './ERC20SnapshotStorage.sol';

/**
 * @title ERC20Snapshot internal functions
 */
abstract contract _ERC20Snapshot is _IERC20Snapshot, _ERC20Base {
    event Snapshot(uint256 id);

    /**
     * @notice query the token balance of given account at given snapshot id
     * @param account address to query
     * @param snapshotId snapshot id to query
     * @return token balance
     */
    function _balanceOfAt(
        address account,
        uint256 snapshotId
    ) internal view virtual returns (uint256) {
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
    function _totalSupplyAt(
        uint256 snapshotId
    ) internal view returns (uint256) {
        (bool snapshotted, uint256 value) = _valueAt(
            snapshotId,
            ERC20SnapshotStorage.layout().totalSupplySnapshots
        );
        return snapshotted ? value : _totalSupply();
    }

    function _snapshot() internal virtual returns (uint256) {
        ERC20SnapshotStorage.Layout storage l = ERC20SnapshotStorage.layout();

        l.snapshotId++;

        uint256 current = l.snapshotId;
        emit Snapshot(current);
        return current;
    }

    function _updateAccountSnapshot(address account) private {
        _updateSnapshot(
            ERC20SnapshotStorage.layout().accountBalanceSnapshots[account],
            _balanceOf(account)
        );
    }

    function _updateTotalSupplySnapshot() private {
        _updateSnapshot(
            ERC20SnapshotStorage.layout().totalSupplySnapshots,
            _totalSupply()
        );
    }

    function _updateSnapshot(
        ERC20SnapshotStorage.Snapshots storage snapshots,
        uint256 value
    ) private {
        uint256 current = ERC20SnapshotStorage.layout().snapshotId;

        if (_lastSnapshotId(snapshots.ids) < current) {
            snapshots.ids.push(current);
            snapshots.values.push(value);
        }
    }

    function _lastSnapshotId(
        uint256[] storage ids
    ) private view returns (uint256) {
        return ids.length == 0 ? 0 : ids[ids.length - 1];
    }

    /**
     * @notice ERC20 hook: update snapshot data
     * @inheritdoc _ERC20Base
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        if (from == address(0)) {
            _updateAccountSnapshot(to);
            _updateTotalSupplySnapshot();
        } else if (to == address(0)) {
            _updateAccountSnapshot(from);
            _updateTotalSupplySnapshot();
        } else {
            _updateAccountSnapshot(to);
            _updateAccountSnapshot(from);
        }
    }

    function _valueAt(
        uint256 snapshotId,
        ERC20SnapshotStorage.Snapshots storage snapshots
    ) private view returns (bool, uint256) {
        if (snapshotId == 0) revert ERC20Snapshot__SnapshotIdIsZero();
        ERC20SnapshotStorage.Layout storage l = ERC20SnapshotStorage.layout();

        if (snapshotId > l.snapshotId)
            revert ERC20Snapshot__SnapshotIdDoesNotExists();

        uint256 index = _findUpperBound(snapshots.ids, snapshotId);

        if (index == snapshots.ids.length) {
            return (false, 0);
        } else {
            return (true, snapshots.values[index]);
        }
    }

    /**
     * @notice find index of first element of array that is greater than or equal to given query
     * @dev array must be sorted in ascending order and contain no duplicates
     * @dev derived from https://github.com/OpenZeppelin/openzeppelin-contracts (MIT license)
     * @param array array to query
     * @param query element to search for
     * @return index of query or array length if query is not found or exceeded
     */
    function _findUpperBound(
        uint256[] storage array,
        uint256 query
    ) private view returns (uint256) {
        unchecked {
            if (array.length == 0) {
                return 0;
            }

            uint256 low = 0;
            uint256 high = array.length;

            while (low < high) {
                uint256 mid = Math.average(low, high);

                if (array[mid] > query) {
                    high = mid;
                } else {
                    low = mid + 1;
                }
            }

            return (low > 0 && array[low - 1] == query) ? low - 1 : low;
        }
    }
}
