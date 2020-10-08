// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './Factory.sol';

contract FactoryMock is Factory {
  function deploy (bytes memory initCode) external returns (address deployment) {
    return _deploy(initCode);
  }

  function deploy (bytes memory initCode, bytes32 salt) external returns (address deployment) {
    return _deploy(initCode, salt);
  }

  function calculateDeploymentAddress (bytes32 initCodeHash, bytes32 salt) external view returns (address) {
    return _calculateDeploymentAddress(initCodeHash, salt);
  }
}
