// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Ownable } from './Ownable.sol';

contract OwnableMock is Ownable {
    constructor(address owner) {
        _setOwner(owner);
    }

    function modifier_onlyOwner() external onlyOwner {
        // do nothing
    }

    function modifier_onlyTransitiveOwner() external onlyTransitiveOwner {
        // do nothing
    }

    function __transferOwnership(address owner) external {
        _transferOwnership(owner);
    }

    function __setOwner(address owner) external {
        _setOwner(owner);
    }

    function __owner() external view returns (address) {
        return _owner();
    }

    function __transitiveOwner() external view returns (address) {
        return _transitiveOwner();
    }
}
