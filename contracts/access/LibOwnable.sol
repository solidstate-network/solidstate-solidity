// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

library LibOwnable {
  bytes32 private constant _slot = keccak256(
    'solidstate.contracts.storage.Ownable'
  );

  struct Layout {
    address owner;
  }

  function getOwner () internal view returns (address) {
    return LibOwnable.layout().owner;
  }

  function setOwner (address owner) internal {
    LibOwnable.layout().owner = owner;
  }

  function requireOwner () internal {
    require(msg.sender == getOwner(), 'Ownable: sender must be owner');
  }

  function layout () internal pure returns (Layout storage l) {
    bytes32 slot = _slot;
    assembly { l.slot := slot }
  }
}
