// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { UpgradeableOwnableProxyBase } from './UpgradeableOwnableProxyBase.sol';

contract UpgradeableOwnableProxyBaseMock is UpgradeableOwnableProxyBase {
    constructor(address implementation)
        UpgradeableOwnableProxyBase(implementation)
    {}

    function getImplementation() public view returns (address) {
        return _getImplementation();
    }

    function getOwner() public view returns (address) {
        return _getOwner();
    }

    function setOwner(address owner) public onlyOwner {
        _setOwner(owner);
    }
}
