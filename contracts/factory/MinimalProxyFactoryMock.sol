// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import { MinimalProxyFactory } from './MinimalProxyFactory.sol';

contract MinimalProxyFactoryMock {
    function __deployMinimalProxy(
        address target
    ) external returns (address minimalProxy) {
        return MinimalProxyFactory.deployMinimalProxy(target);
    }

    function __deployMinimalProxy(
        address target,
        bytes32 salt
    ) external returns (address minimalProxy) {
        return MinimalProxyFactory.deployMinimalProxy(target, salt);
    }

    function __calculateMinimalProxyDeploymentAddress(
        address target,
        bytes32 salt
    ) external view returns (address) {
        return
            MinimalProxyFactory.calculateMinimalProxyDeploymentAddress(
                target,
                salt
            );
    }

    function __generateMinimalProxyInitCode(
        address target
    ) external pure returns (bytes memory) {
        return MinimalProxyFactory.generateMinimalProxyInitCode(target);
    }
}
