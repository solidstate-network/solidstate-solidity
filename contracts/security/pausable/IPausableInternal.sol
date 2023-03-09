// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

interface IPausableInternal {
    error Pausable__Paused();
    error Pausable__NotPaused();

    event Paused(address account);
    event Paused(address account, bytes32 key);
    event Unpaused(address account);
    event Unpaused(address account, bytes32 key);
}
