// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _FungibleToken } from '../_FungibleToken.sol';
import { ERC20Storage } from '../../../storage/ERC20Storage.sol';
import { Math } from '../../../utils/Math.sol';
import { _IFungibleTokenSnapshot } from './_IFungibleTokenSnapshot.sol';

/**
 * @title FungibleTokenSnapshot internal functions
 */
abstract contract _FungibleTokenSnapshot is
    _IFungibleTokenSnapshot,
    _FungibleToken
{
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
            ERC20Storage
                .layout(ERC20Storage.DEFAULT_STORAGE_SLOT)
                .accountBalanceSnapshots[account]
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
            ERC20Storage
                .layout(ERC20Storage.DEFAULT_STORAGE_SLOT)
                .totalSupplySnapshots
        );
        return snapshotted ? value : _totalSupply();
    }

    function _snapshot() internal virtual returns (uint256) {
        ERC20Storage.Layout storage $ = ERC20Storage.layout(
            ERC20Storage.DEFAULT_STORAGE_SLOT
        );

        $.snapshotId++;

        uint256 current = $.snapshotId;
        emit Snapshot(current);
        return current;
    }

    function _updateAccountSnapshot(address account) private {
        _updateSnapshot(
            ERC20Storage
                .layout(ERC20Storage.DEFAULT_STORAGE_SLOT)
                .accountBalanceSnapshots[account],
            _balanceOf(account)
        );
    }

    function _updateTotalSupplySnapshot() private {
        _updateSnapshot(
            ERC20Storage
                .layout(ERC20Storage.DEFAULT_STORAGE_SLOT)
                .totalSupplySnapshots,
            _totalSupply()
        );
    }

    function _updateSnapshot(
        ERC20Storage.Snapshots storage snapshots,
        uint256 value
    ) private {
        uint256 current = ERC20Storage
            .layout(ERC20Storage.DEFAULT_STORAGE_SLOT)
            .snapshotId;

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
     * @inheritdoc _FungibleToken
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
        ERC20Storage.Snapshots storage snapshots
    ) private view returns (bool snapshotted, uint256 value) {
        if (snapshotId == 0) revert FungibleTokenSnapshot__SnapshotIdIsZero();
        ERC20Storage.Layout storage $ = ERC20Storage.layout(
            ERC20Storage.DEFAULT_STORAGE_SLOT
        );

        if (snapshotId > $.snapshotId)
            revert FungibleTokenSnapshot__SnapshotIdDoesNotExists();

        uint256 index = _findUpperBound(snapshots.ids, snapshotId);

        if (index != snapshots.ids.length) {
            snapshotted = true;
            value = snapshots.values[index];
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
