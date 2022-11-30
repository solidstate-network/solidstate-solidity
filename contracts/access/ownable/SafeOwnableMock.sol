// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { SafeOwnable } from './SafeOwnable.sol';

contract SafeOwnableMock is SafeOwnable {
    constructor(address owner) {
        _setOwner(owner);
    }
}
