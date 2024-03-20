// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Factory } from './Factory.sol';

contract FactoryMock {
    function deploy(
        bytes memory initCode
    ) external returns (address deployment) {
        return Factory.deploy(initCode);
    }

    function deploy(
        bytes memory initCode,
        bytes32 salt
    ) external returns (address deployment) {
        return Factory.deploy(initCode, salt);
    }

    function calculateDeploymentAddress(
        bytes32 initCodeHash,
        bytes32 salt
    ) external view returns (address) {
        return Factory.calculateDeploymentAddress(initCodeHash, salt);
    }
}
