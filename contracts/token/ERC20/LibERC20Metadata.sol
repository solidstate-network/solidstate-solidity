// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

library LibERC20Metadata {
  bytes32 internal constant STORAGE_SLOT = keccak256(
    'solidstate.contracts.storage.ERC20Metadata'
  );

  struct Layout {
    string name;
    string symbol;
    uint8 decimals;
  }

  function layout () internal pure returns (Layout storage l) {
    bytes32 slot = STORAGE_SLOT;
    assembly { l.slot := slot }
  }

  function initialize (
    string memory name, string memory symbol, uint8 decimals
  ) internal {
    Layout storage l = layout();
    l.name = name;
    l.symbol = symbol;
    l.decimals = decimals;
  }
}
