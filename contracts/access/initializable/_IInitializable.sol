// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

interface _IInitializable {
    error Initializable__AlreadyInitialized();

    event Initialized(uint8 version);
}
