// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IContext } from '../../meta/_IContext.sol';

interface _IPausable is _IContext {
    error Pausable__Paused();
    error Pausable__NotPaused();

    event Paused(address account);
    event Unpaused(address account);
}
