// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {Array} from '../../utils/Array.sol';
import {ERC20Base} from './ERC20Base.sol';
import {ERC20BaseInternal} from './ERC20BaseInternal.sol';
import {ERC20SnapshotStorage} from './ERC20SnapshotStorage.sol';

/**
 * @title ERC20 base implementation with support for token balance and supply snapshots
 */
abstract contract ERC20Snapshot is ERC20Base {
  using Array for uint[];

  event Snapshot (uint id);

  /**
   * @notice query the token balance of given account at given snapshot id
   * @param account address to query
   * @param snapshotId snapshot id to query
   * @return token balance
   */
  function balanceOfAt (
    address account,
    uint snapshotId
  ) public view returns (uint) {
    (bool snapshotted, uint value) = _valueAt(
      snapshotId,
      ERC20SnapshotStorage.layout().accountBalanceSnapshots[account]
    );
    return snapshotted ? value : balanceOf(account);
  }

  /**
   * @notice query the total minted token supply at given snapshot id
   * @param snapshotId snapshot id to query
   * @return token supply
   */
  function totalSupplyAt (
    uint snapshotId
  ) public view returns (uint) {
    (bool snapshotted, uint value) = _valueAt(
      snapshotId,
      ERC20SnapshotStorage.layout().totalSupplySnapshots
    );
    return snapshotted ? value : totalSupply();
  }

  function _snapshot () virtual internal returns (uint) {
    ERC20SnapshotStorage.Layout storage l = ERC20SnapshotStorage.layout();

    l.snapshotId++;

    uint current = l.snapshotId;
    emit Snapshot(current);
    return current;
  }

  function _valueAt (
    uint snapshotId,
    ERC20SnapshotStorage.Snapshots storage snapshots
  ) private view returns (bool, uint) {
    require(snapshotId > 0, 'ERC20Snapshot: snapshot id must not be zero');
    ERC20SnapshotStorage.Layout storage l = ERC20SnapshotStorage.layout();

    require(
      snapshotId <= l.snapshotId,
      'ERC20Snapshot: snapshot id does not exist'
    );

    uint index = snapshots.ids.findUpperBound(snapshotId);

    if (index == snapshots.ids.length) {
      return (false, 0);
    } else {
      return (true, snapshots.values[index]);
    }
  }

  function _updateAccountSnapshot (
    address account
  ) private {
    _updateSnapshot(
      ERC20SnapshotStorage.layout().accountBalanceSnapshots[account],
      balanceOf(account)
    );
  }

  function _updateTotalSupplySnapshot () private {
    _updateSnapshot(
      ERC20SnapshotStorage.layout().totalSupplySnapshots,
      totalSupply()
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
