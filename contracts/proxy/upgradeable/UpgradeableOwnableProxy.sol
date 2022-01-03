// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { Proxy } from '../Proxy.sol';
import { OwnableInternal } from '../../access/OwnableInternal.sol';
import { OwnableStorage } from '../../access/OwnableStorage.sol';
import { UpgradeableOwnableProxyStorage } from './UpgradeableOwnableProxyStorage.sol';

contract UpgradeableOwnableProxy is Proxy, OwnableInternal {
    using UpgradeableOwnableProxyStorage for UpgradeableOwnableProxyStorage.Layout;
    using OwnableStorage for OwnableStorage.Layout;

    constructor(address implementation) {
        OwnableStorage.layout().setOwner(msg.sender);
        UpgradeableOwnableProxyStorage.layout().implementation = implementation;
    }

    receive() external payable {}

    /**
     * @inheritdoc Proxy
     */
    function _getImplementation() internal view override returns (address) {
        return UpgradeableOwnableProxyStorage.layout().implementation;
    }

    /**
     * @notice get address of implementation contract
     * @return implementation address
     */
    function getImplementation() external view returns (address) {
        return _getImplementation();
    }

    /**
     * @notice set address of implementation contract
     * @param implementation address of the new implementation
     */
    function setImplementation(address implementation) external onlyOwner {
        UpgradeableOwnableProxyStorage.layout().implementation = implementation;
    }
}
