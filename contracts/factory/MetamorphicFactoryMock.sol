// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './MetamorphicFactory.sol';

contract MetamorphicFactoryMock is MetamorphicFactory {
  function deployMetamorphicContract (address target, bytes32 salt) external returns (address metamorphicContract) {
    return _deployMetamorphicContract(target, salt);
  }

  function calculateMetamorphicDeploymentAddress (bytes32 salt) external view returns (address) {
    return _calculateMetamorphicDeploymentAddress(salt);
  }
}
