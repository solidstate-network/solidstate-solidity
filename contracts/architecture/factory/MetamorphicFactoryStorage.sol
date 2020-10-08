// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

abstract contract MetamorphicFactoryStorage {
  bytes32 private constant _ss_MetamorphicFactory = keccak256(
    'solidstate.contracts.storage.MetamorphicFactory'
  );

  struct MetamorphicFactoryStorageLayout {
    address metamorphicImplementation;
  }

  function _ds_MetamorphicFactory () internal pure returns (MetamorphicFactoryStorageLayout storage ds) {
    bytes32 slot = _ss_MetamorphicFactory;
    assembly { ds.slot := slot }
  }
}
