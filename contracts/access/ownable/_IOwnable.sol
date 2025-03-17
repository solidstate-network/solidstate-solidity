// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC173 } from '../../interfaces/_IERC173.sol';
import { _IMsgSenderTrick } from '../../utils/_IMsgSenderTrick.sol';

interface _IOwnable is _IERC173, _IMsgSenderTrick {
    error Ownable__NotOwner();
    error Ownable__NotTransitiveOwner();
}
