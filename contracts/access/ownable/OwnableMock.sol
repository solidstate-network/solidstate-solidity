// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { Ownable, OwnableStorage } from './Ownable.sol';

contract OwnableMock is Ownable {
    using OwnableStorage for OwnableStorage.Layout;

    constructor(address owner) {
        OwnableStorage.layout().setOwner(owner);
    }

    function setOwner(address owner) external {
        OwnableStorage.layout().setOwner(owner);
    }

    function __transitiveOwner() external view returns (address) {
        return _transitiveOwner();
    }
}
