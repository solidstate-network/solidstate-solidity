// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ManagedProxy } from './ManagedProxy.sol';

contract ManagedProxyMock is ManagedProxy {
    address private _manager;

    constructor(
        address manager,
        bytes4 managerSelector
    ) ManagedProxy(managerSelector) {
        setManager(manager);
    }

    function _getManager() internal view override returns (address) {
        return _manager;
    }

    function __getImplementation() external view returns (address) {
        return _getImplementation();
    }

    function setManager(address manager) public {
        _manager = manager;
    }

    /**
     * @dev suppress compiler warning
     */
    receive() external payable {}
}
