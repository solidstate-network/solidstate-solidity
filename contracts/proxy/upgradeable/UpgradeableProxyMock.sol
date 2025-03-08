// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { UpgradeableProxy } from './UpgradeableProxy.sol';

contract UpgradeableProxyMock is UpgradeableProxy {
    constructor(address implementation, address owner) {
        _setImplementation(implementation);
        _setOwner(owner);
    }

    function __getImplementation() external view returns (address) {
        return _getImplementation();
    }

    function __setImplementation(address implementation) external {
        _setImplementation(implementation);
    }

    /**
     * @dev suppress compiler warning
     */
    receive() external payable {}
}
