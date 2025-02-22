// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ManagedProxy, ManagedProxyOwnable } from './ManagedProxyOwnable.sol';

contract ManagedProxyOwnableMock is ManagedProxyOwnable {
    constructor(
        address manager,
        bytes4 managerSelector
    ) ManagedProxy(managerSelector) {
        setOwner(manager);
    }

    function __getImplementation() external view returns (address) {
        return _getImplementation();
    }

    function __getManager() external view returns (address) {
        return _getManager();
    }

    function getOwner() external view returns (address) {
        return _owner();
    }

    function setOwner(address owner) public {
        _setOwner(owner);
    }

    /**
     * @dev suppress compiler warning
     */
    receive() external payable {}
}
