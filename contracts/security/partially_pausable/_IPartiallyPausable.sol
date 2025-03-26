// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

interface _IPartiallyPausable {
    error PartiallyPausable__PartiallyPaused();
    error PartiallyPausable__NotPartiallyPaused();

    event PartiallyPaused(address account, bytes32 key);
    event PartiallyUnpaused(address account, bytes32 key);
}
