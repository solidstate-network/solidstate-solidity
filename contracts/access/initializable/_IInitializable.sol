// SPDX-License-Identifier: MIT

pragma solidity ^0.8.35;

interface _IInitializable {
    error Initializable__AlreadyInitialized();

    event Initialized(uint8 version);
}
