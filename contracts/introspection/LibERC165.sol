// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

library LibERC165 {
  bytes32 internal constant STORAGE_SLOT = keccak256(
    'solidstate.contracts.storage.ERC165'
  );

  struct Layout {
    // TODO: use EnumerableSet to allow post-diamond-cut auditing
    mapping (bytes4 => bool) supportedInterfaces;
  }

  function layout () internal pure returns (Layout storage l) {
    bytes32 slot = STORAGE_SLOT;
    assembly { l.slot := slot }
  }

  function initialize () internal {
    registerInterface(0x01ffc9a7);
  }

  function registerInterface (bytes4 interfaceId) internal {
    require(interfaceId != 0xffffffff, 'ERC165: invalid interface id');
    LibERC165.layout().supportedInterfaces[interfaceId] = true;
  }

  function deregisterInterface (bytes4 interfaceId) internal {
    delete LibERC165.layout().supportedInterfaces[interfaceId];
  }
}
