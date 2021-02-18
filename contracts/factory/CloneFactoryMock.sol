// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './CloneFactory.sol';

contract CloneFactoryMock is CloneFactory {
  function deployClone () external returns (address cloneContract) {
    return _deployClone();
  }

  function deployClone (bytes32 salt) external returns (address cloneContract) {
    return _deployClone(salt);
  }

  function calculateCloneDeploymentAddress (bytes32 salt) external view returns (address) {
    return _calculateCloneDeploymentAddress(salt);
  }
}
