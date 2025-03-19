// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC173 } from '../../interfaces/_IERC173.sol';
import { _IContext } from '../../meta/_IContext.sol';

interface _IOwnable is _IERC173, _IContext {
    error Ownable__NotOwner();
    error Ownable__NotTransitiveOwner();
}
