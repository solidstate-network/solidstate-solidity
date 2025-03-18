// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IContext } from '../../utils/_IContext.sol';

interface _IPartiallyPausable is _IContext {
    error PartiallyPausable__PartiallyPaused();
    error PartiallyPausable__NotPartiallyPaused();

    event PartiallyPaused(address account, bytes32 key);
    event PartiallyUnpaused(address account, bytes32 key);
}
