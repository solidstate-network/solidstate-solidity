// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./GovTokenTypes.sol"

library GovTokenStorage {
  bytes32 internal constant STORAGE_SLOT = keccak256(
    'solidstate.contracts.storage.GovToken'
  );

  struct Layout {
    mapping (address => mapping (uint32 => Checkpoint)) public checkpoints;
    mapping (address => uint32) public numCheckpoints;


    mapping (address => uint) public nonces;

  }

  function layout () internal pure returns (Layout storage l) {
    bytes32 slot = STORAGE_SLOT;
    assembly { l.slot := slot }
  }
}