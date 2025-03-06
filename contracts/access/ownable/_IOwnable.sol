// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC173 } from '../../interfaces/_IERC173.sol';

interface _IOwnable is _IERC173 {
    error Ownable__NotOwner();
    error Ownable__NotTransitiveOwner();
}
