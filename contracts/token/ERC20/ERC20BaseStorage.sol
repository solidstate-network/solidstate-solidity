// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

abstract contract ERC20BaseStorage {
  bytes32 private constant _ss_ERC20Base = keccak256(
    'solidstate.contracts.storage.ERC20Base'
  );

  struct ERC20BaseStorageLayout {
    mapping (address => uint) balances;
    mapping (address => mapping (address => uint)) allowances;
    uint totalSupply;
  }

  function _ds_ERC20Base () internal pure returns (ERC20BaseStorageLayout storage ds) {
    bytes32 slot = _ss_ERC20Base;
    assembly { ds.slot := slot }
  }
}
