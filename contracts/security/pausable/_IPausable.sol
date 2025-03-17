// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IMsgSenderTrick } from '../../utils/_IMsgSenderTrick.sol';

interface _IPausable is _IMsgSenderTrick {
    error Pausable__Paused();
    error Pausable__NotPaused();

    event Paused(address account);
    event Unpaused(address account);
}
