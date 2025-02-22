// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { MinimalProxyFactory } from './MinimalProxyFactory.sol';

contract MinimalProxyFactoryMock {
    function deployMinimalProxy(
        address target
    ) external returns (address minimalProxy) {
        return MinimalProxyFactory.deployMinimalProxy(target);
    }

    function deployMinimalProxy(
        address target,
        bytes32 salt
    ) external returns (address minimalProxy) {
        return MinimalProxyFactory.deployMinimalProxy(target, salt);
    }

    function calculateMinimalProxyDeploymentAddress(
        address target,
        bytes32 salt
    ) external view returns (address) {
        return
            MinimalProxyFactory.calculateMinimalProxyDeploymentAddress(
                target,
                salt
            );
    }

    function generateMinimalProxyInitCode(
        address target
    ) external pure returns (bytes memory) {
        return MinimalProxyFactory.generateMinimalProxyInitCode(target);
    }
}
