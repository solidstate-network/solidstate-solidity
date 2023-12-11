// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

interface IPausableInternal {
    error Pausable__Paused();
    error Pausable__NotPaused();

    event Paused(address account);
    event Unpaused(address account);
}
