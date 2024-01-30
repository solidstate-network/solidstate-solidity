// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import { Factory } from './Factory.sol';

contract FactoryMock {
    function __deploy(
        bytes memory initCode
    ) external returns (address deployment) {
        return Factory.deploy(initCode);
    }

    function __deploy(
        bytes memory initCode,
        bytes32 salt
    ) external returns (address deployment) {
        return Factory.deploy(initCode, salt);
    }

    function __calculateDeploymentAddress(
        bytes32 initCodeHash,
        bytes32 salt
    ) external view returns (address) {
        return Factory.calculateDeploymentAddress(initCodeHash, salt);
    }
}
