// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC20Base } from '../base/_IERC20Base.sol';

interface _IERC20Snapshot is _IERC20Base {
    error ERC20Snapshot__SnapshotIdDoesNotExists();
    error ERC20Snapshot__SnapshotIdIsZero();
}
