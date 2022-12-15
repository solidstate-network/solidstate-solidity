// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { Ownable } from './Ownable.sol';

contract OwnableMock is Ownable {
    constructor(address owner) {
        _setOwner(owner);
    }

    function setOwner(address owner) external {
        _setOwner(owner);
    }

    function __transitiveOwner() external view returns (address) {
        return _transitiveOwner();
    }
}
