// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import { UpgradeableProxy } from './UpgradeableProxy.sol';

contract UpgradeableProxyMock is UpgradeableProxy {
    constructor(address implementation) {
        _setImplementation(implementation);
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
