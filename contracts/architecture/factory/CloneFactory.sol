// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './Factory.sol';

/**
 * @title Factory for contract self-replication
 * @dev derived from https://github.com/ItsNickBarry/solidity-auto-deployer (MIT license)
 */
abstract contract CloneFactory is Factory {
  bytes private constant _cloneInitCode = hex'58333b90818180333cf3';
  bytes32 private constant _cloneInitCodeHash = keccak256(abi.encodePacked(_cloneInitCode));

  /**
   * @notice deploy a clone of the calling contract using "CREATE" opcode
   * @return cloneContract address of deployed contract
   */
  function _deployClone () internal returns (address cloneContract) {
    return _deploy(_cloneInitCode);
  }

  /**
   * @notice deploy a clone of the calling contract using "CREATE2" opcode
   * @dev reverts if deployment is not successful (likely because salt has already been used)
   * @param salt input for deterministic address calculation
   * @return cloneContract address of deployed contract
   */
  function _deployClone (bytes32 salt) internal returns (address cloneContract) {
    return _deploy(_cloneInitCode, salt);
  }

  /**
   * @notice calculate the deployment address for a given salt
   * @param salt input for deterministic address calculation
   * @return deployment address
   */
  function _calculateCloneDeploymentAddress (bytes32 salt) internal view returns (address) {
    return _calculateDeploymentAddress(_cloneInitCodeHash, salt);
  }
}
