// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

library ERC1271StoredStorage {
  bytes32 internal constant STORAGE_SLOT = keccak256(
    'solidstate.contracts.storage.ERC1271Stored'
  );

  struct Layout {
    mapping (bytes32 => bool) hashes;
  }

  function layout () internal pure returns (Layout storage l) {
    bytes32 slot = STORAGE_SLOT;
    assembly { l.slot := slot }
  }
}
