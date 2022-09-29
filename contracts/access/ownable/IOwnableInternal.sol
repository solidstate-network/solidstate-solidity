// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { IERC173Internal } from '../../interfaces/IERC173Internal.sol';

interface IOwnableInternal is IERC173Internal {
    error OwnableInternal_NotOwner();
    error OwnableInternal_NotTransitiveOwner();
}
