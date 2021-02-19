// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

library ERC20ImplicitApprovalStorage {
  bytes32 internal constant STORAGE_SLOT = keccak256(
    'solidstate.contracts.storage.ERC20ImplicitApproval'
  );

  struct Layout {
    mapping (address => bool) implicitApprovals;
  }

  function layout () internal pure returns (Layout storage l) {
    bytes32 slot = STORAGE_SLOT;
    assembly { l.slot := slot }
  }
}
