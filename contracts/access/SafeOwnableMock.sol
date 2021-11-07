// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { SafeOwnable, OwnableStorage } from './SafeOwnable.sol';

contract SafeOwnableMock is SafeOwnable {
    using OwnableStorage for OwnableStorage.Layout;

    constructor(address owner) {
        OwnableStorage.layout().setOwner(owner);
    }
}
