// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './LibOwnable.sol';

library LibSafeOwnable {
  bytes32 internal constant STORAGE_SLOT = keccak256(
    'solidstate.contracts.storage.SafeOwnable'
  );

  struct Layout {
    address nomineeOwner;
  }

  function layout () internal pure returns (Layout storage l) {
    bytes32 slot = STORAGE_SLOT;
    assembly { l.slot := slot }
  }

  function initialize (address owner) internal {
    LibOwnable.layout().owner = owner;
  }
}
