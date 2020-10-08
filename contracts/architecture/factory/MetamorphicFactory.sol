// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './Factory.sol';
import './MetamorphicFactoryStorage.sol';

/**
 * @dev derived from https://github.com/0age/metamorphic (MIT license)
 */
abstract contract MetamorphicFactory is Factory, MetamorphicFactoryStorage {
  bytes private constant _metamorphicInitCode = hex'5860208158601c335a63_9c223603_8752fa158151803b80938091923cf3';
  bytes32 private constant _metamorphicInitCodeHash = keccak256(abi.encodePacked(_metamorphicInitCode));

  /**
   * @notice get metamorphic prototype deployment location for copying
   * @dev function selector must match that referenced by initialization code
   * @return implementation address of metamorphic implementation
   */
  function getMetamorphicImplementation () external view returns (address implementation) {
    return _ds_MetamorphicFactory().metamorphicImplementation;
  }

  /**
   * @notice deploy a metamorphic contract
   * @param target reference contract to copy to metamorphic address
   * @param salt input for deterministic address calculation
   * @return metamorphicContract address of deployed metamorphic implementation
   */
  function _deployMetamorphicContract (address target, bytes32 salt) internal returns (address metamorphicContract) {
    MetamorphicFactoryStorageLayout storage ds = _ds_MetamorphicFactory();
    ds.metamorphicImplementation = target;
    metamorphicContract = _deploy(_metamorphicInitCode, salt);
    ds.metamorphicImplementation = address(0);
  }

  /**
   * @notice calculate the deployment address for a given salt
   * @param salt input for deterministic address calculation
   * @return deployment address
   */
  function _calculateMetamorphicDeploymentAddress (bytes32 salt) internal view returns (address) {
    return _calculateDeploymentAddress(_metamorphicInitCodeHash, salt);
  }
}
