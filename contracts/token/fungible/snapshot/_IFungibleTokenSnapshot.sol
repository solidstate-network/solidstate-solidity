// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IFungibleToken } from '../_IFungibleToken.sol';

interface _IFungibleTokenSnapshot is _IFungibleToken {
    error FungibleTokenSnapshot__SnapshotIdDoesNotExists();
    error FungibleTokenSnapshot__SnapshotIdIsZero();
}
