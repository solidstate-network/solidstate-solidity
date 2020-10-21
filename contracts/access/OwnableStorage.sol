// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

abstract contract OwnableStorage {
  bytes32 private constant _ss_Ownable = keccak256(
    'solidstate.contracts.storage.Ownable'
  );

  struct OwnableStorageLayout {
    address owner;
  }

  modifier onlyOwner () {
    require(msg.sender == _getOwner(), 'Ownable: sender must be owner');
    _;
  }

  function _getOwner () internal view returns (address) {
    return _ds_Ownable().owner;
  }

  function _setOwner (address owner) internal {
    _ds_Ownable().owner = owner;
  }

  function _ds_Ownable () internal pure returns (OwnableStorageLayout storage ds) {
    bytes32 slot = _ss_Ownable;
    assembly { ds.slot := slot }
  }
}
