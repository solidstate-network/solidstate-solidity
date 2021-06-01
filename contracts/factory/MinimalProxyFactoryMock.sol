// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {MinimalProxyFactory} from './MinimalProxyFactory.sol';

contract MinimalProxyFactoryMock is MinimalProxyFactory {
  function deployMinimalProxy (address target) external returns (address minimalProxy) {
    return _deployMinimalProxy(target);
  }

  function deployMinimalProxy (address target, bytes32 salt) external returns (address minimalProxy) {
    return _deployMinimalProxy(target, salt);
  }

  function calculateMinimalProxyDeploymentAddress (address target, bytes32 salt) external view returns (address) {
    return _calculateMinimalProxyDeploymentAddress(target, salt);
  }

  function generateMinimalProxyInitCode (address target) external pure returns (bytes memory) {
    return _generateMinimalProxyInitCode(target);
  }
}
