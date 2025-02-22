// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

interface IInitializableInternal {
    error Initializable__AlreadyInitialized();

    event Initialized(uint8 version);
}
