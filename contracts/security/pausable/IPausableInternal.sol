// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

interface IPausableInternal {
    error Pausable__Paused();
    error Pausable__NotPaused();

    event Paused(address account);
    event PausedWithKey(address account, bytes32 key);
    event Unpaused(address account);
    event UnpausedWithKey(address account, bytes32 key);
}
