// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { Ownable, OwnableStorage } from './Ownable.sol';

contract OwnableMock is Ownable {
    using OwnableStorage for OwnableStorage.Layout;

    constructor(address owner) {
        OwnableStorage.layout().setOwner(owner);
    }
}
