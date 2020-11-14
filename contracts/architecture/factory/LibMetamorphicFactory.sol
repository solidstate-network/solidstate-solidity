// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

library LibMetamorphicFactory {
  bytes32 private constant _slot = keccak256(
    'solidstate.contracts.storage.MetamorphicFactory'
  );

  struct Layout {
    address metamorphicImplementation;
  }

  function layout () internal pure returns (Layout storage l) {
    bytes32 slot = _slot;
    assembly { l.slot := slot }
  }
}
