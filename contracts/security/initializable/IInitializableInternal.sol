// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

interface IInitializableInternal {
    error Initializable__AlreadyInitialized();
    error Initializable__NotInitializing();
    error Initializable__IsInitializing();
}
