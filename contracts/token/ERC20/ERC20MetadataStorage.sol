// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

abstract contract ERC20MetadataStorage {
  bytes32 private constant _ss_ERC20Metadata = keccak256(
    'solidstate.contracts.storage.ERC20Metadata'
  );

  struct ERC20MetadataStorageLayout {
    string name;
    string symbol;
    uint8 decimals;
  }

  function _ds_ERC20Metadata () internal pure returns (ERC20MetadataStorageLayout storage ds) {
    bytes32 slot = _ss_ERC20Metadata;
    assembly { ds.slot := slot }
  }
}
