// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

library LibERC20Metadata {
  bytes32 private constant _slot = keccak256(
    'solidstate.contracts.storage.ERC20Metadata'
  );

  struct Layout {
    string name;
    string symbol;
    uint8 decimals;
  }

  function layout () internal pure returns (Layout storage l) {
    bytes32 slot = _slot;
    assembly { l.slot := slot }
  }
}
