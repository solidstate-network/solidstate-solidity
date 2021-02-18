// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

library OwnableStorage {
  bytes32 internal constant STORAGE_SLOT = keccak256(
    'solidstate.contracts.storage.Ownable'
  );

  struct Layout {
    address owner;
  }

  function layout () internal pure returns (Layout storage l) {
    bytes32 slot = STORAGE_SLOT;
    assembly { l.slot := slot }
  }

  function setOwner (
    Layout storage l,
    address owner
  ) internal {
    l.owner = owner;
  }
}
