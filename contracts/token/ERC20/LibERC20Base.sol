// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

library LibERC20Base {
  bytes32 private constant _slot = keccak256(
    'solidstate.contracts.storage.ERC20Base'
  );

  struct Layout {
    mapping (address => uint) balances;
    mapping (address => mapping (address => uint)) allowances;
    uint totalSupply;
  }

  function layout () internal pure returns (Layout storage l) {
    bytes32 slot = _slot;
    assembly { l.slot := slot }
  }
}
