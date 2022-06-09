// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { OwnableInternal, OwnableStorage } from '../../access/ownable/OwnableInternal.sol';
import { ManagedProxy, ManagedProxyOwnable } from './ManagedProxyOwnable.sol';

contract ManagedProxyOwnableMock is ManagedProxyOwnable, OwnableInternal {
    using OwnableStorage for OwnableStorage.Layout;

    constructor(address manager, bytes4 managerSelector)
        ManagedProxy(managerSelector)
    {
        setOwner(manager);
    }

    function __getImplementation() external view returns (address) {
        return _getImplementation();
    }

    function __getManager() external view returns (address) {
        return _getManager();
    }

    function getOwner() external view returns (address) {
        return OwnableStorage.layout().owner;
    }

    function setOwner(address owner) public {
        OwnableStorage.layout().setOwner(owner);
    }

    /**
     * @dev suppress compiler warning
     */
    receive() external payable {}
}
