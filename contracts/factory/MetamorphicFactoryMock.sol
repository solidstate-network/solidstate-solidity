// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {MetamorphicFactory} from './MetamorphicFactory.sol';

contract MetamorphicFactoryMock is MetamorphicFactory {
  function __deployMetamorphicContract (address target, bytes32 salt) external returns (address metamorphicContract) {
    return _deployMetamorphicContract(target, salt);
  }

  function __calculateMetamorphicDeploymentAddress (bytes32 salt) external view returns (address) {
    return _calculateMetamorphicDeploymentAddress(salt);
  }
}
