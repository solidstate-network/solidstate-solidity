// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import { CloneFactory } from './CloneFactory.sol';

contract CloneFactoryMock {
    function __deployClone() external returns (address cloneContract) {
        return CloneFactory.deployClone();
    }

    function __deployClone(
        bytes32 salt
    ) external returns (address cloneContract) {
        return CloneFactory.deployClone(salt);
    }

    function __calculateCloneDeploymentAddress(
        bytes32 salt
    ) external view returns (address) {
        return CloneFactory.calculateCloneDeploymentAddress(salt);
    }
}
