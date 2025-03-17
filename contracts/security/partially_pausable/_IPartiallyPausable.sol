// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IMsgSenderTrick } from '../../utils/_IMsgSenderTrick.sol';

interface _IPartiallyPausable is _IMsgSenderTrick {
    error PartiallyPausable__PartiallyPaused();
    error PartiallyPausable__NotPartiallyPaused();

    event PartiallyPaused(address account, bytes32 key);
    event PartiallyUnpaused(address account, bytes32 key);
}
