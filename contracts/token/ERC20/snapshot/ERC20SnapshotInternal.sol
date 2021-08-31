// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// TODO: remove ERC20BaseStorage import
import {ERC20BaseInternal, ERC20BaseStorage} from '../base/ERC20Base.sol';
import {ERC20SnapshotStorage} from './ERC20SnapshotStorage.sol';

/**
 * @title ERC20Snapshot internal functions
 */
abstract contract ERC20SnapshotInternal is ERC20BaseInternal {
  event Snapshot (uint id);

  function _snapshot () virtual internal returns (uint) {
    ERC20SnapshotStorage.Layout storage l = ERC20SnapshotStorage.layout();

    l.snapshotId++;

    uint current = l.snapshotId;
    emit Snapshot(current);
    return current;
  }

  function _updateAccountSnapshot (
    address account
  ) private {
    _updateSnapshot(
      ERC20SnapshotStorage.layout().accountBalanceSnapshots[account],
      _balanceOf(account)
    );
  }

  function _updateTotalSupplySnapshot () private {
    _updateSnapshot(
      ERC20SnapshotStorage.layout().totalSupplySnapshots,
      _totalSupply()
    );
  }

  function _updateSnapshot (
    ERC20SnapshotStorage.Snapshots storage snapshots,
    uint value
  ) private {
    uint current = ERC20SnapshotStorage.layout().snapshotId;

    if (_lastSnapshotId(snapshots.ids) < current) {
      snapshots.ids.push(current);
      snapshots.values.push(value);
    }
  }

  function _lastSnapshotId (
    uint[] storage ids
  ) private view returns (uint) {
    return ids.length == 0 ? 0 : ids[ids.length - 1];
  }

  /**
   * @notice ERC20 hook: update snapshot data
   * @inheritdoc ERC20BaseInternal
   */
  function _beforeTokenTransfer (
    address from,
    address to,
    uint amount
  ) virtual override internal {
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
}
