// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { CloneFactory } from './CloneFactory.sol';

contract CloneFactoryMock {
    function deployClone() external returns (address cloneContract) {
        return CloneFactory.deployClone();
    }

    function deployClone(
        bytes32 salt
    ) external returns (address cloneContract) {
        return CloneFactory.deployClone(salt);
    }

    function calculateCloneDeploymentAddress(
        bytes32 salt
    ) external view returns (address) {
        return CloneFactory.calculateCloneDeploymentAddress(salt);
    }
}
