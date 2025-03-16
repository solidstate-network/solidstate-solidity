// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

interface _IPausable {
    error Pausable__Paused();
    error Pausable__NotPaused();

    event Paused(address account);
    event Unpaused(address account);
}
