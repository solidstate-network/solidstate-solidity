// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IFungibleTokenBase } from '../base/_IFungibleTokenBase.sol';

interface _IFungibleTokenSnapshot is _IFungibleTokenBase {
    error FungibleTokenSnapshot__SnapshotIdDoesNotExists();
    error FungibleTokenSnapshot__SnapshotIdIsZero();
}
